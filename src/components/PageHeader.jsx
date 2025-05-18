import React from 'react';
import PropTypes from 'prop-types';

export default function PageHeader({
  title,
  subtitle,
  className = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
}) {
  return (
    <div className={`${className} rounded-lg shadow-xl mb-8 p-6 text-white`}>
      <h1 className="text-4xl font-bold mb-2 text-center">{title}</h1>
      {subtitle && <p className="text-center opacity-80">{subtitle}</p>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

PageHeader.defaultProps = {
  subtitle: null,
  className: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
};
