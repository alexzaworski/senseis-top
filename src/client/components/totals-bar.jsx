import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import {SET_SORT_ORDER} from '../../shared/action-types';

const TotalsUser = SortableElement(({userId, life, pos}) => {
  return (
    // couple notes on className here--
    // 1. the element is removed from its container while sorting,
    //    so we can't use nth-of-type to style users anymore
    // 2. the index prop isn't passed through SortableElement into
    //    the component it creates so we need to pass something
    //    else (hence `pos`)
    <div className={`totals-bar__user totals-bar__user--pos-${pos}`}>
      <div className="totals-bar__user-id">{userId}</div>
      <div className="totals-bar__user-life">{life}</div>
    </div>
  );
});

const TotalsList = SortableContainer(({users}) => {
  return (
    <div className="totals-bar">
      {users.map((user, index) => {
        const {userId, life} = user;
        return (
          <TotalsUser
            key={userId}
            userId={userId}
            life={life}
            index={index}
            pos={index}
            disabled={users.length === 1}
          />
        );
      })}
    </div>
  );
});

class TotalsBar extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array,
    userSortOrder: PropTypes.array,
    setSortOrder: PropTypes.func,
  };

  render() {
    const {users, setSortOrder, userSortOrder} = this.props;
    return (
      <TotalsList
        users={userSortOrder.map(userIndex => {
          return users[userIndex];
        })}
        axis={'x'}
        onSortEnd={setSortOrder}
      />
    );
  }
}

const mapStateToProps = state => {
  const {otherUsers, userSortOrder} = state;
  return {
    users: otherUsers,
    userSortOrder,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSortOrder: ({oldIndex, newIndex}) =>
      dispatch({type: SET_SORT_ORDER, oldIndex, newIndex}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalsBar);
