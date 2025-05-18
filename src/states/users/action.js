import Swal from 'sweetalert2';
import { api } from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
  RECEIVE_OWN_PROFILE: 'RECEIVE_OWN_PROFILE',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

function asyncReceiveUsers() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.register({ name, email, password });
      Swal.fire({
        title: 'Registrasi Berhasil!',
        text: 'Anda telah berhasil mendaftar. Silahkan login untuk melanjutkan',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncReceiveUsers,
  asyncRegisterUser,
};
