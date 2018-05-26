import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import FullPageLoader from '../../components/full-page-loader';

import ActiveRoom from './active-room';
import JoinRoom from './join-room';
import RoomList from './room-list';

class Rooms extends React.PureComponent {
  static propTypes = {
    activeRoom: PropTypes.object,
    attemptedRoom: PropTypes.string,
    rooms: PropTypes.array,
  };

  render() {
    const {activeRoom, attemptedRoom, rooms} = this.props;
    return (
      <Switch>
        {!rooms && <Route path="/rooms" component={FullPageLoader} />}

        {activeRoom ? (
          <Switch>
            <Route path="/rooms/active" component={ActiveRoom} />
            <Redirect from="/rooms/join" to="/" />
            <Redirect from="/rooms" to="/rooms/active" />
          </Switch>
        ) : (
          <Redirect from="/rooms/active" to="/rooms" />
        )}

        <Route path="/rooms/join" component={JoinRoom} />
        {attemptedRoom && <Redirect from="/rooms" to="/rooms/join" />}

        <Route path="/rooms" component={RoomList} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  const {rooms, activeRoom, attemptedRoom} = state;
  return {
    rooms,
    activeRoom,
    attemptedRoom,
  };
};

export default connect(mapStateToProps)(Rooms);
