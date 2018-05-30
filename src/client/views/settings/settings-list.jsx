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
      settings: {defaultLife},
    } = this.props;
    return (
      <ul className="underlined-list">
        <li className="underlined-list__item">
          <Link
            to="/settings/default-total"
            replace
            className="underlined-list__item-wrap"
          >
            <div className="underlined-list__primary">Default life total</div>
            <div className="underlined-list__secondary">{defaultLife}</div>
          </Link>
        </li>
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
