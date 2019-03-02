import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import SpectatorActiveUser from './spectator-active-user';

class SpectatorTotals extends React.PureComponent {
  state = {
    activeUser: null,
  };

  static propTypes = {
    users: PropTypes.array,
  };

  setActiveUser = id => {
    this.setState({activeUser: id});
  };

  render() {
    const {users} = this.props;
    const {activeUser} = this.state;

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

SpectatorTotals.propTypes = {};

const mapStateToProps = state => {
  const {otherUsers} = state;
  return {
    users: otherUsers,
  };
};

export default connect(mapStateToProps)(SpectatorTotals);
