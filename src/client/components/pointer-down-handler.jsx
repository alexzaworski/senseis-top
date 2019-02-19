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
    const {onPointerDown} = this.props;
    if (onPointerDown) {
      downEvents.forEach(pointerDown => {
        this.eventTarget.addEventListener(pointerDown, this.handlePointerDown);
      });
    }
  }

  componentWillUnmount() {
    const {onPointerDown, onPointerUp} = this.props;
    if (onPointerDown) {
      downEvents.forEach(pointerDown => {
        this.eventTarget.removeEventListener(
          pointerDown,
          this.handlePointerDown
        );
      });
    }

    if (onPointerUp) {
      upEvents.forEach(pointerUp => {
        document.removeEventListener(pointerUp, this.handlePointerUp);
      });
    }
  }

  handlePointerDown = event => {
    event.preventDefault();
    const {onPointerDown, onPointerUp} = this.props;
    onPointerDown(event);

    if (!onPointerUp) return;

    upEvents.forEach(pointerUp => {
      document.addEventListener(pointerUp, this.handlePointerUp, {
        once: true,
      });
    });
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
