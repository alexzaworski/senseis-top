import React from 'react';
import PropTypes from 'prop-types';

class TotalsBar extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array,
  };

  render() {
    const {users} = this.props;
    return (
      <div className="totals-bar">
        {users.map(({userId, life}) => {
          return (
            <div className="totals-bar__user" key={userId}>
              <div className="totals-bar__user-id">{userId}</div>
              <div className="totals-bar__user-life">{life}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

module.exports = TotalsBar;
