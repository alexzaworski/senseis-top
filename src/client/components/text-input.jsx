import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({inputProps, label, error, id}) => {
  return (
    <div className="text-input-wrap">
      {label && (
        <label className="text-input-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={id}
        className={['text-input', error && 'text-input--error']
          .filter(Boolean)
          .join(' ')}
      />
      {error && <div className="text-input-error">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  inputProps: PropTypes.object,
  label: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
};

export default TextInput;
