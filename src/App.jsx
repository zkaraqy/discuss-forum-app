import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from './layouts/AuthLayout';
import DefaultLayout from './layouts/DefaultLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailThreadPage from './pages/DetailThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import './styles/App.css';
import LoadingPage from './pages/LoadingPage';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/Loading';
import FormThread from './pages/FormThread';

const ROUTES = {
  HOME: '/',
  REGISTER: '/registrasi',
  LOGIN: '/login',
  FORM: '/thread/form',
  DETAIL_THREAD: '/thread/detail/:id',
  LEADERBOARD: '/leaderboard',
  ERROR: '*',
};

function App() {
  const dispatch = useDispatch();
  const { authUser, isPreload } = useSelector((state) => ({
    authUser: state.authUser,
    isPreload: state.isPreload,
  }));

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <>
        <Loading />
        <LoadingPage />
      </>
    );
  }

  if (!authUser) {
    return (
      <>
        <Loading />
        <AuthLayout>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.ERROR} element={<LoginPage />} />
          </Routes>
        </AuthLayout>
      </>
    );
  }

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.FORM} element={<FormThread />} />
          <Route path={ROUTES.DETAIL_THREAD} element={<DetailThreadPage />} />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
          <Route path={ROUTES.ERROR} element={<NotFoundPage />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
