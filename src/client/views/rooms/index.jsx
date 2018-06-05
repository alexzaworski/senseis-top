import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import FullPageLoader from '../../components/full-page-loader';
import RouteHeader from '../../components/route-header';

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

    if (!rooms) return <FullPageLoader />;

    if (activeRoom) {
      return (
        <Switch>
          <Route path="/rooms/active" component={ActiveRoom} />
          <Redirect from="/rooms/join" to="/" />
          <Redirect from="/rooms" to="/rooms/active" />
        </Switch>
      );
    }

    return (
      <Fragment>
        <RouteHeader
          path="/rooms"
          label="Rooms"
          renderDefaultHeader={() => {
            return (
              <div className="header__title-wrap">
                <h2 className="header__title">Rooms</h2>
                <Link to="/rooms/join" className="button">
                  Create
                </Link>
              </div>
            );
          }}
        />
        <main className="view-main">
          <Switch>
            <Redirect from="/rooms/active" to="/rooms" />
            <Route path="/rooms/join" component={JoinRoom} />
            {attemptedRoom && <Redirect from="/rooms" to="/rooms/join" />}
            <Route path="/rooms" component={RoomList} />
          </Switch>
        </main>
      </Fragment>
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
