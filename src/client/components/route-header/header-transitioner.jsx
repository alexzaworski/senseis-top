import React from 'react';
import PropTypes from 'prop-types';

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

    this.header.addEventListener('animationend', () => {
      this.setState({
        isAnimating: false,
      });
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
    return this.props.children({
      headerRef: this.headerRef,
      modifierClasses: isAnimating ? ['animating'] : [],
      headerStyle: isAnimating
        ? {
            willChange: 'transform',
            transform: `translateY(${diff}px)`,
            height: maxHeight || 'auto',
            marginTop: elOffset,
          }
        : {
            willChange: 'transform',
          },
    });
  }
}

export default HeaderTransitioner;
