import React from 'react';
import PropTypes from 'prop-types';

export default function AuthLayout({ children }) {
  return (
    <div
      data-theme="light"
      className="w-screen h-screen flex justify-center items-center"
    >
      {children}
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};

AuthLayout.defaultProps = {
  children: null,
};