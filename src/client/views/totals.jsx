import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import {
  INCREMENT_LIFE,
  DECREMENT_LIFE,
  SET_LIFE_REQUEST,
  RESET_LIFE,
} from '../../shared/action-types';
import TotalsBar from '../components/totals-bar';
import PointerHandler from '../components/pointer-down-handler';
import Icon from '../components/icon';

class Totals extends React.PureComponent {
  static propTypes = {
    self: PropTypes.object,
    activeRoom: PropTypes.object,
    incrementLife: PropTypes.func,
    decrementLife: PropTypes.func,
    defaultLife: PropTypes.number,
    resetLife: PropTypes.func,
  };

  static contextTypes = {
    wsSend: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    const {self, activeRoom} = this.props;
    const {self: prevSelf} = prevProps;

    if (!activeRoom) return;
    if (self.life === prevSelf.life) return;

    this.context.wsSend({type: SET_LIFE_REQUEST, ...self, ...activeRoom});
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  createPointerDownHandler = lifeTotalFn => {
    return () => {
      lifeTotalFn();
      this.clearTimeouts();
      this.pointerDownTimeout = setTimeout(() => {
        this.interval = setInterval(lifeTotalFn, 48);
      }, 500);
    };
  };

  handleIncrement = this.createPointerDownHandler(this.props.incrementLife);
  handleDecrement = this.createPointerDownHandler(this.props.decrementLife);

  clearTimeouts = () => {
    clearTimeout(this.pointerDownTimeout);
    clearInterval(this.interval);
  };

  resetLife = () => {
    const {defaultLife, resetLife} = this.props;
    resetLife(defaultLife);
  };

  render() {
    const {
      self: {life},
    } = this.props;

    return (
      <Fragment>
        <TotalsBar />
        <main className="view-main view-main--flex">
          <div className="life-total">
            <div className="life-total__number">{life}</div>
            <div className="life-total__controls">
              <PointerHandler
                onPointerDown={this.handleDecrement}
                onPointerUp={this.clearTimeouts}
              >
                {ref => (
                  <button ref={ref} className="button life-total__control">
                    -
                  </button>
                )}
              </PointerHandler>
              <PointerHandler
                onPointerDown={this.handleIncrement}
                onPointerUp={this.clearTimeouts}
              >
                {ref => (
                  <button ref={ref} className="button life-total__control">
                    +
                  </button>
                )}
              </PointerHandler>
            </div>

            <button
              onClick={this.resetLife}
              className="button button--plain"
              aria-label="Reset Life"
            >
              <Icon symbol="reset" className="life-total__reset" />
            </button>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    self,
    activeRoom,
    settings: {defaultLife},
  } = state;
  return {
    self,
    activeRoom,
    defaultLife,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementLife: () => dispatch({type: INCREMENT_LIFE}),
    decrementLife: () => dispatch({type: DECREMENT_LIFE}),
    resetLife: life => dispatch({type: RESET_LIFE, life}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Totals);
