import Swal from 'sweetalert2';
import { api } from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: { comments },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function upVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: { vote: { threadId, commentId, userId } },
  };
}

function downVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: { vote: { threadId, commentId, userId } },
  };
}

function neutralVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: { vote: { threadId, commentId, userId } },
  };
}

function asyncReceiveComments(threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveCommentsActionCreator(threadDetail.comments));
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(receiveCommentsActionCreator([]));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    if (!content) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Comment content is required!',
      });
      return;
    }

    try {
      dispatch(showLoading());
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
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

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    if (!threadId || !commentId) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Thread ID and Comment ID are required!',
      });
      return;
    }
    const { authUser } = getState();
    dispatch(
      upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
    );
    try {
      dispatch(showLoading());
      await api.upVoteThreadComment({ threadId, commentId });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(
        neutralVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    if (!threadId || !commentId) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Thread ID and Comment ID are required!',
      });
      return;
    }

    const { authUser } = getState();
    dispatch(
      downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
    );
    try {
      dispatch(showLoading());
      await api.downVoteThreadComment({ threadId, commentId });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      dispatch(
        neutralVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncNeutralVoteComment({ threadId, commentId }, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      })
    );
    try {
      dispatch(showLoading());
      await api.neutralVoteThreadComment({ threadId, commentId });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: e.message,
      });
      if (voteType === 'upVote') {
        dispatch(
          upVoteCommentActionCreator({
            threadId,
            commentId,
            userId: authUser.id,
          })
        );
      } else if (voteType === 'downVote') {
        dispatch(
          downVoteCommentActionCreator({
            threadId,
            commentId,
            userId: authUser.id,
          })
        );
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveCommentsActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncReceiveComments,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
