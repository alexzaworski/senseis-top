import {Route} from 'react-router-dom';
import React, {Fragment} from 'react';

import RouteHeader from '../../components/route-header';

import SettingsList from './settings-list';
import DefaultLife from './default-life';
import Help from './help';

class Settings extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <RouteHeader path="/settings" label="Settings" />
        <main className="view-main">
          <Route path="/settings" exact component={SettingsList} />
          <Route path="/settings/default-total" exact component={DefaultLife} />
          <Route path="/settings/help" exact component={Help} />
        </main>
      </Fragment>
    );
  }
}

export default Settings;
