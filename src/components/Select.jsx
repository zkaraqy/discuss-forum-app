import React from 'react';
import PropTypes from 'prop-types';

export default function Select({
  value,
  onChange,
  className = 'select',
  options = [],
  placeholder = 'Pilih opsi',
  defaultOption = { value: '', label: 'Semua' },
  showDefaultOption = true,
}) {
  return (
    <select className={className} value={value} onChange={onChange}>
      {showDefaultOption && (
        <option
          value={defaultOption.value}
        >{`${defaultOption.label} ${placeholder}`}</option>
      )}
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  placeholder: PropTypes.string,
  defaultOption: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  showDefaultOption: PropTypes.bool,
};

Select.defaultProps = {
  value: '',
  className: 'select',
  placeholder: 'Pilih opsi',
  defaultOption: { value: '', label: 'Semua' },
  showDefaultOption: true,
};
