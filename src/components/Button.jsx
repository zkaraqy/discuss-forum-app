import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  id,
  type = 'button',
  className = 'btn',
  onClick,
  children,
  disabled,
}) {
  return (
    <button
      id={id}
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  id: undefined,
  type: 'button',
  className: 'btn',
  onClick: undefined,
  disabled: false,
};
