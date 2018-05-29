import React from 'react';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';

class HeaderTransitioner extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func,
    heightKey: PropTypes.string,
  };

  heightCache = {};

  state = {
    isAnimating: false,
  };

  componentDidMount() {
    this.setState({
      maxHeight: this.measureHeaderHeight(),
    });
  }

  componentDidUpdate(prevProps) {
    const {heightKey: prevKey} = prevProps;
    const {maxHeight} = this.state;
    const {heightKey} = this.props;

    if (heightKey === prevKey) return;

    const {heightCache} = this;
    const height = this.measureHeaderHeight();
    heightCache[heightKey] = height;
    const diff = heightCache[prevKey] - heightCache[heightKey];
    this.setState({
      diff,
      elOffset: Math.min(diff * -1, 0),
      maxHeight: Math.max(maxHeight, height),
      isAnimating: true,
    });
  }

  headerRef = el => {
    this.header = el;
  };

  measureHeaderHeight = () => {
    const {heightKey} = this.props;
    const {heightCache} = this;
    if (heightCache[heightKey]) return heightCache[heightKey];

    const forcedHeight = this.header.style.height;
    this.header.style.height = 'auto';
    const {height} = this.header.getBoundingClientRect();
    this.header.style.height = forcedHeight;

    heightCache[heightKey] = height;
    return height;
  };

  render() {
    const {diff, maxHeight, isAnimating, elOffset} = this.state;
    return (
      <Motion
        key={this.props.heightKey}
        defaultStyle={{translate: 0}}
        style={{
          translate: diff ? spring(diff, {stiffness: 400, damping: 35}) : 0,
        }}
        onRest={() => {
          this.setState({isAnimating: false});
        }}
      >
        {({translate}) => {
          return this.props.children({
            headerRef: this.headerRef,
            headerStyle: isAnimating
              ? {
                  willChange: 'transform',
                  transform: `translateY(${diff - translate}px)`,
                  height: maxHeight || 'auto',
                  marginTop: elOffset,
                }
              : null,
          });
        }}
      </Motion>
    );
  }
}

export default HeaderTransitioner;
