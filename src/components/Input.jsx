import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  type,
  isRequired,
  inputClassName = 'input',
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      required={isRequired}
      className={inputClassName}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  isRequired: false,
  inputClassName: 'input',
  placeholder: '',
};
