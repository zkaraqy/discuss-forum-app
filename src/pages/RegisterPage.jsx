import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import useTogglePasswordVisibility from '../hooks/useTogglePasswordVisibility';
import { asyncRegisterUser } from '../states/users/action';
import FieldInput from '../components/FieldInput';
import Input from '../components/Input';
import Tooltip from '../components/Tooltip';
import Button from '../components/Button';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword, togglePasswordVisibility } =
    useTogglePasswordVisibility();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure className="">
        <img
          className="hidden md:block"
          src="/ilustrasi-login.png"
          alt="Ilustrasi registrasi"
        />
      </figure>
      <div className="card-body">
        <div className="h-full flex justify-center items-center flex-col gap-4">
          <div className="">
            <h2 className="card-title text-3xl justify-center">Registrasi</h2>
            <span>Silahkan daftarkan akun anda</span>
          </div>
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <FieldInput
                label="Nama"
                type="text"
                placeholder="Masukkan nama"
                value={name}
                isRequired={true}
                onChange={(e) => setName(e.target.value)}
              />

              <FieldInput
                label="Email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                isRequired={true}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="label">Password</label>
              <div className="flex gap-2">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  inputClassName="input"
                  placeholder="Masukkan password"
                  value={password}
                  isRequired={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Tooltip dataTip={showPassword ? 'Hide' : 'Show'}>
                  <Button
                    id="toggle-password"
                    type="button"
                    className="btn-neutral"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </Tooltip>
              </div>

              <Button type="submit" className="btn-primary mt-4">
                Daftar
              </Button>

              <Link to="/login" className="link link-info">
                Udah punya akun? Login disini!
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
