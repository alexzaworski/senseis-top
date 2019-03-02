import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SettingsList extends React.PureComponent {
  static propTypes = {
    settings: PropTypes.object,
  };

  render() {
    const {
      settings: {
        defaultLife,
        spectatorMode,
        experimentalFeatures, // has to be enabled manually
      },
    } = this.props;

    return (
      <ul className="underlined-list">
        <li className="underlined-list__item">
          <Link
            to="/settings/help"
            replace
            className="underlined-list__item-wrap util-inherit-color"
          >
            Help
          </Link>
        </li>
        <li className="underlined-list__item">
          <Link
            to="/settings/default-total"
            replace
            className="underlined-list__item-wrap util-inherit-color"
          >
            <div className="underlined-list__primary">Default life total</div>
            <div className="underlined-list__secondary">{defaultLife}</div>
          </Link>
        </li>
        {experimentalFeatures && (
          <li className="underlined-list__item">
            <Link
              to="/settings/spectator-mode"
              replace
              className="underlined-list__item-wrap util-inherit-color"
            >
              <div className="underlined-list__primary">Spectator Mode</div>
              <div className="underlined-list__secondary">
                {spectatorMode ? 'ON' : 'OFF'}
              </div>
            </Link>
          </li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const {settings} = state;
  return {
    settings,
  };
};

export default connect(mapStateToProps)(SettingsList);
