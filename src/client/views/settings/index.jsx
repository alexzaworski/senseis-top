import {Route, Redirect, Switch} from 'react-router-dom';
import React, {Fragment} from 'react';

import RouteHeader from '../../components/route-header';

import SettingsList from './settings-list';
import DefaultLife from './default-life';
import Help from './help';
import ObserverMode from './observer-mode';

class Settings extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <RouteHeader path="/settings" label="Settings" />
        <main className="view-main">
          <Switch>
            <Route path="/settings" exact component={SettingsList} />
            <Route
              path="/settings/default-total"
              exact
              component={DefaultLife}
            />
            <Route path="/settings/help" exact component={Help} />
            <Route
              path="/settings/observer-mode"
              exact
              component={ObserverMode}
            />
            <Redirect to="/settings" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default Settings;
