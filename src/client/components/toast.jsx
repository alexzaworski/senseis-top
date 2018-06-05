import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Icon from '../components/icon';
import {CLEAR_TOAST} from '../../shared/action-types';

const TOAST_DURATION = 2500;

class Toast extends React.PureComponent {
  static propTypes = {
    toast: PropTypes.object,
    clearToast: PropTypes.func,
    location: PropTypes.object,
  };

  state = {
    active: false,
  };

  componentDidUpdate(prevProps) {
    const {toast: prevToast} = prevProps;
    const {toast} = this.props;

    if (toast && toast !== prevToast) {
      clearTimeout(this.timeout);
      this.setState({active: true});
      this.timeout = setTimeout(() => {
        this.setState({active: false});
      }, TOAST_DURATION);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  handleAnimationEnd = () => {
    const {active} = this.state;
    const {clearToast, toast} = this.props;
    !active && toast && clearToast();
  };

  render() {
    const {toast} = this.props;

    if (!toast) return null;

    const {active} = this.state;
    const {toastType, message} = toast;
    const isError = toastType === 'error';
    const isSuccess = toastType === 'success';

    return (
      <div className="toast-wrap">
        <div
          onAnimationEnd={this.handleAnimationEnd}
          className={[
            'toast',
            active && 'toast--active',
            isError && 'toast--error',
            isSuccess && 'toast--success',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Icon
            symbol={isError ? 'exclamation' : 'check'}
            className="toast__icon"
          />
          <div className="toast__message">{message}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {toast} = state;
  return {toast};
};

const mapDispatchToProps = dispatch => {
  return {
    clearToast: () => dispatch({type: CLEAR_TOAST}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);
