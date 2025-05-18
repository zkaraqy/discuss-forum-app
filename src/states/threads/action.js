import Swal from 'sweetalert2';
import { api } from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: { vote: { threadId, userId } },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: { vote: { threadId, userId } },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: { vote: { threadId, userId } },
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(receiveThreadsActionCreator([]));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    if (!title || !body) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Title and body are required!',
      });
      return;
    }

    try {
      dispatch(showLoading());
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
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

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!threadId) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Thread ID is required!',
      });
      return;
    }

    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      dispatch(showLoading());
      await api.upVoteThread(threadId);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!threadId) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Thread ID is required!',
      });
      return;
    }

    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      dispatch(showLoading());
      await api.downVoteThread(threadId);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralVoteThread(threadId, voteType) {
  // voteType = 'upVote' or 'downVote'
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!threadId) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Thread ID is required!',
      });
      return;
    }

    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      dispatch(showLoading());
      await api.neutralVoteThread(threadId);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      if (voteType === 'upVote') {
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else if (voteType === 'downVote') {
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
