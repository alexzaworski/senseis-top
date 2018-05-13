import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import NoSleep from 'nosleep.js/dist/NoSleep.js'; // uglify barfing on es6 in src
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {
  LIST_ROOMS_REQUEST,
  JOIN_ROOM_REQUEST,
  WS_ERROR,
} from '../shared/action-types';

import {CONNECTION_LOST} from '../shared/error-codes';
import Totals from './views/totals';
import RoomList from './views/room-list';
import JoinRoom from './views/join-room';
import ActiveRoom from './views/active-room';

import FullPageLoader from './components/full-page-loader';
import TabBar from './components/tab-bar';
import Toast from './components/toast';

const wsHost =
  process.env.NODE_ENV === 'production'
    ? process.env.WS_HOST_PROD
    : process.env.WS_HOST_DEV;

const retryTimeout = 2000;

class App extends React.PureComponent {
  static propTypes = {
    dispatchSocketMessage: PropTypes.func,
    rooms: PropTypes.array,
    activeRoom: PropTypes.object,
    attemptedRoom: PropTypes.string,
    self: PropTypes.object,
    storedRoom: PropTypes.object,
    connectionLost: PropTypes.func,
  };

  static childContextTypes = {
    wsSend: PropTypes.func,
  };

  componentDidMount() {
    const noSleep = new NoSleep();
    document.addEventListener('touchstart', () => noSleep.enable(), {
      once: true,
    });
    this.connect();
  }

  getChildContext() {
    return {
      wsSend: this.wsSend,
    };
  }

  wsSend = message => {
    if (!this.socket || this.socket.readyState !== 1) return;
    this.props.dispatchSocketMessage(message);
    this.socket.send(JSON.stringify(message));
  };

  connect = () => {
    const {activeRoom, self, storedRoom, connectionLost} = this.props;
    const socket = new WebSocket(wsHost);
    socket.onclose = () =>
      setTimeout(() => {
        this.connect(true);
        connectionLost();
      }, retryTimeout);
    socket.onmessage = m => this.handleMessage(JSON.parse(m.data));
    socket.onopen = () => {
      this.socket = socket;
      this.wsSend({type: LIST_ROOMS_REQUEST});
      const roomToJoin = activeRoom || storedRoom;
      if (roomToJoin) {
        // joining aroom actually triggers LIST_ROOMS_SUCCESS by itself,
        // but we want to dispatch it above regardless in case this
        // errors out.
        this.wsSend(Object.assign({type: JOIN_ROOM_REQUEST}, roomToJoin, self));
      }
    };
  };

  handleMessage = data => {
    this.props.dispatchSocketMessage(data);
  };

  render() {
    const {rooms, activeRoom, attemptedRoom} = this.props;
    return (
      <Router>
        <div className="view-wrap">
          <Route exact path="/" component={Totals} />
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
          <Toast />
          <TabBar />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const {rooms, activeRoom, attemptedRoom, self, storedRoom} = state;
  return {
    rooms,
    activeRoom,
    attemptedRoom,
    self,
    storedRoom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSocketMessage: message => {
      dispatch(message);
    },
    connectionLost: () => {
      dispatch({type: WS_ERROR, error: CONNECTION_LOST});
    },
  };
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
