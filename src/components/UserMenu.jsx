import React from 'react';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import Button from './Button';
import UserAvatar from './UserAvatar';

export default function UserMenu({ user, onLogout, isMobile = false }) {
  if (isMobile) {
    return (
      <li>
        <details>
          <summary>
            <div className="flex gap-2 items-center">
              <UserAvatar user={user} />
              {user?.name || 'User'}
            </div>
          </summary>
          <ul className="p-2 space-y-2">
            <li>
              <Button className="btn-sm btn-error w-full" onClick={onLogout}>
                <FiLogOut /> Logout
              </Button>
            </li>
          </ul>
        </details>
      </li>
    );
  }

  return (
    <li>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <UserAvatar user={user} />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
        >
          <li>
            <Button className="btn-sm btn-error" onClick={onLogout}>
              <FiLogOut /> Logout
            </Button>
          </li>
        </ul>
      </div>
    </li>
  );
}

UserMenu.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

UserMenu.defaultProps = {
  user: null,
  isMobile: false,
};
