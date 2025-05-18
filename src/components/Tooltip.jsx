import React from 'react';
import PropTypes from 'prop-types';

export default function Tooltip({ className = 'tooltip', dataTip, children }) {
  return (
    <div className={className} data-tip={dataTip}>
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  className: PropTypes.string,
  dataTip: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Tooltip.defaultProps = {
  className: 'tooltip',
};
