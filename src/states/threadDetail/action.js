import Swal from 'sweetalert2';
import { api } from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: { userId },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: { userId },
  };
}

function neutralVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: { userId },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
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

function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadDetailActionCreator(authUser.id));
    try {
      dispatch(showLoading());
      await api.upVoteThread(threadId);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadDetailActionCreator(authUser.id));
    try {
      dispatch(showLoading());
      await api.downVoteThread(threadId);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralVoteThreadDetail(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
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
        dispatch(
          upVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
        );
      } else if (voteType === 'downVote') {
        dispatch(
          downVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
        );
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
};
