import React from 'react';
import PropTypes from 'prop-types';

export default function UserAvatar({ user, size = 'w-10 h-10' }) {
  return (
    <div className={`rounded-full ${size}`}>
      <img
        alt={user?.name || 'User Profile'}
        src={
          user?.avatar ||
          `https://ui-avatars.com/api/?name=${user?.name || 'User'}`
        }
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  size: PropTypes.string,
};

UserAvatar.defaultProps = {
  user: null,
  size: 'w-10 h-10',
};
