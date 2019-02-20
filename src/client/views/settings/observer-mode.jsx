import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Toggle from '../../components/toggle';
import {UPDATE_SETTINGS} from '../../../shared/action-types';

class ObserverMode extends React.PureComponent {
  static propTypes = {
    observerMode: PropTypes.bool,
    saveObserverMode: PropTypes.func,
  };

  state = {
    observerMode: this.props.observerMode,
    hasSaved: false,
  };

  handleChange = event => {
    const {saveObserverMode} = this.props;
    saveObserverMode(event.target.checked);
  };

  render() {
    const {observerMode} = this.props;
    return (
      <Fragment>
        <h3 className="subheader">Observer Mode</h3>
        <p>
          Observer mode allows you to join rooms as a passive user and prevents
          you from creating rooms of your own. While in observer mode you will
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
          label="Enable observer mode"
          inputProps={{checked: observerMode, onChange: this.handleChange}}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const {
    settings: {observerMode},
  } = state;
  return {
    observerMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveObserverMode: observerMode => {
      dispatch({
        type: UPDATE_SETTINGS,
        settings: {observerMode},
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObserverMode);
