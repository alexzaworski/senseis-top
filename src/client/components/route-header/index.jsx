import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';

import HeaderTransitioner from './header-transitioner';
import Icon from '../icon';

class RouteHeader extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    const {path, label} = this.props;
    return (
      <Route path={path}>
        {({match: {isExact}}) => {
          return (
            <HeaderTransitioner
              heightKey={isExact ? 'route-header' : 'route-header-collapsed'}
            >
              {({headerRef, headerStyle}) => {
                return (
                  <header
                    ref={headerRef}
                    style={headerStyle}
                    className={['header', !isExact && 'header--collapsed']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {isExact ? (
                      <h2 className="header__title">{label}</h2>
                    ) : (
                      <Link to={path} replace className="header__back-link">
                        <Icon
                          symbol="chevronLeft"
                          className="header__back-link__icon"
                        />
                        {label}
                      </Link>
                    )}
                  </header>
                );
              }}
            </HeaderTransitioner>
          );
        }}
      </Route>
    );
  }
}

module.exports = RouteHeader;