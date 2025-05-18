import Swal from 'sweetalert2';
import { api } from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveCommentsActionCreator } from '../comments/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncPopulateThreadsAndUsers() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      // Ambil data threads dan users secara paralel
      const [threads, users] = await Promise.all([
        api.getAllThreads(),
        api.getAllUsers(),
      ]);

      // Dispatch data threads dan users ke reducer masing-masing
      dispatch(receiveThreadsActionCreator(threads));
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

function asyncPopulateCommentsAndUsers(threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      // Ambil detail thread (termasuk comments) dan users secara paralel
      const [threadDetail, users] = await Promise.all([
        api.getThreadDetail(threadId),
        api.getAllUsers(),
      ]);

      // Dispatch data comments dan users ke reducer masing-masing
      dispatch(receiveCommentsActionCreator(threadDetail.comments));
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

export { asyncPopulateThreadsAndUsers, asyncPopulateCommentsAndUsers };
