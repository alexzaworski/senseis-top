const React = require('react');
const PropTypes = require('prop-types');

class SpectatorActiveUser extends React.PureComponent {
  state = {
    cachedUser: this.props.user,
  };

  static propTypes = {
    user: PropTypes.object,
    connected: PropTypes.bool,
    waitGoBack: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    const {user: prevUser} = prevProps;
    const {user} = this.props;
    if (!user && prevUser) {
      this.setState({
        cachedUser: prevUser,
      });
    }
  }

  render() {
    const {user: propsUser, waitGoBack} = this.props;
    const {cachedUser: stateUser} = this.state;
    // TODO: indicator for if the active user is connected?
    // const isConnected = !!propsUser;
    const user = propsUser || stateUser;
    const {userId, life} = user;

    return (
      <div key={userId} className="spectator-totals__user" onClick={waitGoBack}>
        <div className="spectator-totals__user-id">{userId}</div>
        <div className="spectator-totals__user-life">{life}</div>
      </div>
    );
  }
}

export default SpectatorActiveUser;
