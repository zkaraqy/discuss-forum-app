import React from 'react';
import TopBar from '../components/TopBar';
import PropTypes from 'prop-types';

export default function DefaultLayout({ children }) {
  return (
    <div data-theme="light" className="min-h-screen">
      <TopBar>{children}</TopBar>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

DefaultLayout.defaultProps = {
  children: null,
};