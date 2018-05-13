import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {maxRoomSize} from '../../shared/config';
import {Link} from 'react-router-dom';
import Icon from '../components/icon/';
import {SET_ATTEMPTED_ROOM} from '../../shared/action-types';

class Rooms extends React.PureComponent {
  static propTypes = {
    rooms: PropTypes.array,
    attemptRoom: PropTypes.func,
  };

  render() {
    const {rooms, attemptRoom} = this.props;
    return (
      <Fragment>
        <header className="header">
          <div className="header__title-wrap">
            <h2 className="header__title">Rooms</h2>
            <Link to="/rooms/join" className="button">
              Create
            </Link>
          </div>
        </header>
        <main className="view-main">
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
                      {userCount}/{maxRoomSize}
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="underlined-list__item">No rooms yet</li>
            )}
          </ul>
        </main>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
