import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import Loading from './Loading';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import Swal from 'sweetalert2';
import { MdOutlineLeaderboard } from 'react-icons/md';

const navLinks = [
  {
    to: '/leaderboard',
    label: 'Leaderboard',
    icon: <MdOutlineLeaderboard className="mr-1" />,
    className: '',
  },
];

export default function TopBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const handleLogout = () => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan keluar dari akun ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'Tidak',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncUnsetAuthUser());
        Swal.fire({
          title: 'Berhasil!',
          text: 'Anda telah keluar dari akun ini',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/login');
      }
    });
  };

  return (
    <div className="drawer">
      <Loading />
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <header className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="mx-2 flex-1 px-2">
            <Link to="/" className="btn btn-ghost text-xl">
              Discuss Forum App
            </Link>
          </div>

          <nav className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal items-center">
              <NavLinks links={navLinks} />
              <UserMenu user={authUser} onLogout={handleLogout} />
            </ul>
          </nav>
        </div>

        {children}
      </header>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-2">
          <UserMenu user={authUser} onLogout={handleLogout} isMobile={true} />
          <NavLinks links={navLinks} />
        </ul>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  children: PropTypes.node,
};

TopBar.defaultProps = {
  children: null,
};
