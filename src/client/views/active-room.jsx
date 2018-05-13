import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LEAVE_ROOM_REQUEST} from '../../shared/action-types';

import Icon from '../components/icon/index';

class ActiveRoom extends React.PureComponent {
  static contextTypes = {
    wsSend: PropTypes.func,
  };

  static propTypes = {
    roomId: PropTypes.string,
    isPrivate: PropTypes.bool,
    self: PropTypes.object,
    users: PropTypes.array,
    password: PropTypes.string,
  };

  state = {};

  disconnect = () => {
    const {
      roomId,
      self: {userId},
      password,
    } = this.props;
    this.context.wsSend({
      type: LEAVE_ROOM_REQUEST,
      roomId,
      password,
      userId,
    });
  };

  render() {
    const {
      roomId,
      users,
      isPrivate,
      self: {userId: ownId},
    } = this.props;
    return (
      <Fragment>
        <header className="header">
          <div className="header__title-wrap">
            {isPrivate && <Icon symbol="lock" className="header__icon" />}
            <h3 className="header__title">{roomId}</h3>
          </div>
        </header>
        <main className="view-main">
          <ul className="underlined-list">
            {users
              .sort((a, b) => a.userId.localeCompare(b.userId))
              .map(user => {
                const {userId, life} = user;
                const isActive = userId === ownId;
                const classNames = [
                  'underlined-list__item',
                  isActive && 'underlined-list__item--active',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <li className={classNames} key={userId}>
                    <span className="underlined-list__primary">{userId}</span>
                    <div className="underlined-list__secondary">{life}</div>
                  </li>
                );
              })}
          </ul>
          <div className="button-group">
            <button className="button button--danger" onClick={this.disconnect}>
              Disconnect
            </button>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    activeRoom: {roomId, password},
    self,
    otherUsers,
  } = state;
  return {
    roomId,
    password,
    isPrivate: Boolean(password),
    self,
    users: [self, ...otherUsers],
  };
};

export default connect(mapStateToProps)(ActiveRoom);
