import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

export default function FieldInput({
  labelClassName = 'label',
  label,
  type,
  isRequired,
  inputClassName = 'input',
  placeholder,
  value,
  onChange,
}) {
  return (
    <>
      <label className={labelClassName}>{label}</label>
      <Input
        type={type}
        isRequired={isRequired}
        inputClassName={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

FieldInput.propTypes = {
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

FieldInput.defaultProps = {
  labelClassName: 'label',
  isRequired: false,
  inputClassName: 'input',
  placeholder: '',
};
