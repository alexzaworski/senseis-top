import {Route} from 'react-router-dom';
import React, {Fragment} from 'react';

import RouteHeader from '../../components/route-header';

import SettingsList from './settings-list';
import DefaultLife from './default-life';

class Settings extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <RouteHeader path="/settings" label="Settings" />
        <main className="view-main">
          <Route path="/settings" exact component={SettingsList} />
          <Route path="/settings/default-total" exact component={DefaultLife} />
        </main>
      </Fragment>
    );
  }
}

export default Settings;
