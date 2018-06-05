import React from 'react';
import PropTypes from 'prop-types';

import {getDef, getSize} from './defs';

export default class Icon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    symbol: PropTypes.string,
  };

  render() {
    const {symbol, className} = this.props;
    const size = getSize(symbol);
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {getDef(symbol)}
      </svg>
    );
  }
}
