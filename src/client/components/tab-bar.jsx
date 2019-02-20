import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import Icon from './icon';

const TabItem = ({to, exact, children, ...props}) => {
  return (
    <NavLink
      className="tab-bar__item"
      activeClassName="tab-bar__item--active"
      to={to}
      exact={exact}
      {...props}
    >
      {children}
    </NavLink>
  );
};

TabItem.propTypes = {
  to: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.any,
};

const TabBar = () => {
  return (
    <nav className="tab-bar">
      <TabItem to="/" exact aria-label="Life Totals">
        <Icon className="tab-bar__item-icon" symbol="top" />
      </TabItem>
      <TabItem to="/rooms" aria-label="Rooms">
        <Icon className="tab-bar__item-icon" symbol="globe" />
      </TabItem>
      <TabItem to="/settings" aria-label="Settings">
        <Icon className="tab-bar__item-icon" symbol="cog" />
      </TabItem>
    </nav>
  );
};

export default TabBar;
