import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({inputProps, label}) => {
  return (
    <label className="toggle">
      <input className="toggle-input" type="checkbox" {...inputProps} />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-text">{label}</span>
    </label>
  );
};

TextInput.propTypes = {
  inputProps: PropTypes.object,
  label: PropTypes.string,
};

export default TextInput;
