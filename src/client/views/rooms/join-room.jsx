import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import TextInput from '../../components/text-input';
import errorMessageForCode from '../../util/error-message-for-code';
import clearErrorForCause from '../../actions/clear-error-for-cause';
import {
  JOIN_ROOM_REQUEST,
  CLEAR_ATTEMPTED_ROOM,
} from '../../../shared/action-types';
import {INVALID_PASS, USER_EXISTS} from '../../../shared/error-codes';

class CreateRoom extends React.PureComponent {
  static contextTypes = {
    wsSend: PropTypes.func,
  };

  static propTypes = {
    clearAttemptedRoom: PropTypes.func,
    clearError: PropTypes.func,
    attemptedRoom: PropTypes.string,
    life: PropTypes.number,
    userId: PropTypes.string,
    currentError: PropTypes.string,
    hidePasswordInput: PropTypes.bool,
  };

  state = {
    attemptedRoom: this.props.attemptedRoom,
    hidePasswordInput: this.props.hidePasswordInput,
    formData: {
      userId: this.props.userId || '',
      roomId: this.props.attemptedRoom || '',
      password: '',
    },
  };

  componentDidMount() {
    const {
      attemptedRoom,
      clearAttemptedRoom,
      currentError,
      clearError,
    } = this.props;
    attemptedRoom && clearAttemptedRoom();
    currentError && clearError();
  }

  handleInput = event => {
    const {
      target: {value, id},
    } = event;
    const {formData} = this.state;
    this.setState({
      formData: {
        ...formData,
        [id]: value,
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {formData} = this.state;
    const {life} = this.props;
    this.context.wsSend({type: JOIN_ROOM_REQUEST, life, ...formData});
  };

  messageForErrorCode = code => {
    const {currentError} = this.props;
    return code === currentError ? errorMessageForCode(code) : null;
  };

  render() {
    const {formData, attemptedRoom, hidePasswordInput} = this.state;
    const {userId, roomId, password} = formData;
    return (
      <Fragment>
        <h3 className="subheader">
          {attemptedRoom ? `Joining "${attemptedRoom}"` : 'Create room'}
        </h3>
        <form onSubmit={this.handleSubmit}>
          {!attemptedRoom && (
            <TextInput
              id="roomId"
              label="Room name"
              inputProps={{
                autoComplete: 'off',
                type: 'text',
                value: roomId,
                required: true,
                onChange: this.handleInput,
              }}
            />
          )}
          <TextInput
            id="userId"
            label="Your display name"
            error={this.messageForErrorCode(USER_EXISTS)}
            inputProps={{
              autoComplete: 'off',
              type: 'text',
              value: userId,
              required: true,
              onChange: this.handleInput,
            }}
          />
          {!hidePasswordInput && (
            <TextInput
              id="password"
              label="Room password"
              error={this.messageForErrorCode(INVALID_PASS)}
              inputProps={{
                autoComplete: 'off',
                type: 'password',
                value: password,
                onChange: this.handleInput,
              }}
            />
          )}
          <div className="button-group">
            <Link to="/rooms" className="button button--secondary">
              Cancel
            </Link>
            <button className="button button--primary">
              {attemptedRoom ? 'Join' : 'Create'}
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    attemptedRoom,
    self: {life, userId},
    errors: {joinRoom: currentError},
    rooms,
  } = state;

  const foundRoom =
    attemptedRoom &&
    rooms.find(room => {
      return room.roomId === attemptedRoom;
    });

  const hidePasswordInput = foundRoom && foundRoom.isPrivate === false;

  return {
    attemptedRoom,
    hidePasswordInput,
    life,
    userId,
    currentError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearAttemptedRoom: () => dispatch({type: CLEAR_ATTEMPTED_ROOM}),
    clearError: () => dispatch(clearErrorForCause(JOIN_ROOM_REQUEST)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);
