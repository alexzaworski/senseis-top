import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Toggle from '../../components/toggle';
import {UPDATE_SETTINGS} from '../../../shared/action-types';

class SpectatorMode extends React.PureComponent {
  static propTypes = {
    spectatorMode: PropTypes.bool,
    saveSpectatorMode: PropTypes.func,
  };

  state = {
    spectatorMode: this.props.spectatorMode,
    hasSaved: false,
  };

  handleChange = event => {
    const {saveSpectatorMode} = this.props;
    saveSpectatorMode(event.target.checked);
  };

  render() {
    const {spectatorMode} = this.props;
    return (
      <Fragment>
        <h3 className="subheader">Spectator Mode</h3>
        <p>
          Spectator mode allows you to join rooms as a passive user and prevents
          you from creating rooms of your own. While in spectator mode you will
          not get disconnected for inactivity.
        </p>
        <p>
          If all other users leave the room you are observing, you will be
          removed automatically.
        </p>
        <p className="notice">
          Heads up: this is still pretty experimental, use at your own risk
        </p>
        <Toggle
          label="Enable spectator mode"
          inputProps={{checked: spectatorMode, onChange: this.handleChange}}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    settings: {spectatorMode},
  } = state;
  return {
    spectatorMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveSpectatorMode: spectatorMode => {
      dispatch({
        type: UPDATE_SETTINGS,
        settings: {spectatorMode},
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpectatorMode);
