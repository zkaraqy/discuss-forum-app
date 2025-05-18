import React from 'react';
import PropTypes from 'prop-types';

export default function Textarea({
  value,
  onChange,
  placeholder,
  className = 'textarea',
  required = false,
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      required={required}
    ></textarea>
  );
}

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

Textarea.defaultProps = {
  placeholder: '',
  className: 'textarea',
  required: false,
};
