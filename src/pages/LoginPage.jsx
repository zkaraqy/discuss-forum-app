import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';
import { asyncSetAuthUser } from '../states/authUser/action';
import FieldInput from '../components/FieldInput';
import Input from '../components/Input';
import Tooltip from '../components/Tooltip';
import Button from '../components/Button';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword, togglePasswordVisibility } =
    useTogglePasswordVisibility();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = dispatch(asyncSetAuthUser({ email, password }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure className="">
        <img
          className="hidden md:block"
          src="/ilustrasi-login.png"
          alt="Ilustrasi login"
        />
      </figure>
      <div className="card-body">
        <div className="h-full flex justify-center items-center flex-col gap-4">
          <div className="">
            <h2 className="card-title text-3xl justify-center">Login</h2>
            <span>Silahkan login dengan akun yang telah terdaftar</span>
          </div>
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <FieldInput
                label={'Email'}
                type={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password</label>
              <div className="flex gap-2">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  placeholder={'Masukkan password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Tooltip dataTip={showPassword ? 'Hide' : 'Show'}>
                  <Button
                    id="toggle-password"
                    type="button"
                    className="btn btn-neutral"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </Tooltip>
              </div>
              <Button type="submit" className="btn btn-primary mt-4">
                Login
              </Button>
              <Link to="/registrasi" className="link link-info">
                Belum punya akun? daftar disini!
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
