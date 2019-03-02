import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import ObserverActiveUser from './observer-active-user';

class ObserverTotals extends React.PureComponent {
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
          <ObserverActiveUser
            waitGoBack={() => this.setActiveUser(null)}
            user={foundUser}
          />
        </div>
      );
    }

    return (
      <div className="view-main">
        <div className="observer-totals">
          {users.map(user => {
            const {userId, life} = user;
            return (
              <div
                key={userId}
                className="observer-totals__user"
                onClick={() => this.setActiveUser(userId)}
              >
                <div className="observer-totals__user-id">{userId}</div>
                <div className="observer-totals__user-life">{life}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ObserverTotals.propTypes = {};

const mapStateToProps = state => {
  const {otherUsers} = state;
  return {
    users: otherUsers,
  };
};

export default connect(mapStateToProps)(ObserverTotals);
