import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import SpectatorActiveUser from './spectator-active-user';

class SpectatorTotals extends React.PureComponent {
  state = {
    activeUser: null,
  };

  static propTypes = {
    activeRoom: PropTypes.object,
    users: PropTypes.array,
  };

  setActiveUser = id => {
    this.setState({activeUser: id});
  };

  render() {
    const {users, activeRoom} = this.props;
    const {activeUser} = this.state;

    if (!activeRoom)
      return (
        <div className="view-main">
          <p>
            You&apos;re currently in spectator mode,{' '}
            <Link to="/rooms">join a room</Link> to see life totals.
          </p>
        </div>
      );

    if (activeUser) {
      const foundUser = users.find(u => u.userId === activeUser);
      return (
        <div className="view-main view-main--flex">
          <SpectatorActiveUser
            waitGoBack={() => this.setActiveUser(null)}
            user={foundUser}
          />
        </div>
      );
    }

    return (
      <div className="view-main">
        <div className="spectator-totals">
          {users.map(user => {
            const {userId, life} = user;
            return (
              <div
                key={userId}
                className="spectator-totals__user"
                onClick={() => this.setActiveUser(userId)}
              >
                <div className="spectator-totals__user-id">{userId}</div>
                <div className="spectator-totals__user-life">{life}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {otherUsers, activeRoom} = state;
  return {
    users: otherUsers,
    activeRoom,
  };
};

export default connect(mapStateToProps)(SpectatorTotals);
