import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {SET_ATTEMPTED_ROOM} from '../../../shared/action-types';
import Icon from '../../components/icon/';
import {MAX_ROOM_SIZE} from '../../../shared/config';

class Rooms extends React.PureComponent {
  static propTypes = {
    rooms: PropTypes.array,
    attemptRoom: PropTypes.func,
  };

  render() {
    const {rooms, attemptRoom} = this.props;
    return (
      <ul className="underlined-list">
        {rooms.length > 0 ? (
          rooms.map(room => {
            const {roomId, isPrivate, userCount} = room;
            return (
              <li
                className="underlined-list__item"
                key={roomId}
                onClick={() => attemptRoom(roomId)}
              >
                <span className="underlined-list__primary">{roomId}</span>
                {isPrivate && (
                  <Icon symbol="lock" className="underlined-list__icon" />
                )}
                <div className="underlined-list__secondary">
                  {userCount}/{MAX_ROOM_SIZE}
                </div>
              </li>
            );
          })
        ) : (
          <li className="underlined-list__item">No rooms yet</li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const {rooms} = state;
  return {rooms};
};

const mapDispatchToProps = dispatch => {
  return {
    attemptRoom: roomId => {
      dispatch({
        type: SET_ATTEMPTED_ROOM,
        roomId,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);
