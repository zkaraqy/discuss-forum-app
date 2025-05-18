import Swal from 'sweetalert2';
import { api } from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const user = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(user));
      Swal.fire({
        title: 'Login Berhasil!',
        text: 'Anda telah berhasil login',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      return true;
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
