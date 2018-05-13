import React from 'react';
import PropTypes from 'prop-types';

const downEvents = ['touchstart', 'mousedown'];
const upEvents = ['touchend', 'mouseup'];

class PointerHandler extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onPointerDown: PropTypes.func,
    onPointerUp: PropTypes.func,
  };

  componentDidMount() {
    if (this.props.onPointerDown) {
      downEvents.forEach(pointerDown => {
        this.eventTarget.addEventListener(pointerDown, this.handlePointerDown);
      });
    }

    if (this.props.onPointerUp) {
      upEvents.forEach(pointerUp => {
        this.eventTarget.addEventListener(pointerUp, this.handlePointerUp);
      });
    }
  }

  componentWillUnmount() {
    if (this.props.onPointerDown) {
      downEvents.forEach(pointerDown => {
        this.eventTarget.removeEventListener(
          pointerDown,
          this.handlePointerDown
        );
      });
    }

    if (this.props.onPointerUp) {
      upEvents.forEach(pointerUp => {
        this.eventTarget.removeEventListener(pointerUp, this.handlePointerUp);
      });
    }
  }

  handlePointerDown = event => {
    event.preventDefault();
    this.props.onPointerDown(event);
  };

  handlePointerUp = event => {
    event.preventDefault();
    this.props.onPointerUp(event);
  };

  pointerTargetRef = el => (this.eventTarget = el);

  render() {
    return this.props.children(this.pointerTargetRef);
  }
}

export default PointerHandler;
