import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NavLinks({ links }) {
  return (
    <>
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.to} className={link.className}>
            {link.icon}
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

NavLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      className: PropTypes.string,
    })
  ).isRequired,
};