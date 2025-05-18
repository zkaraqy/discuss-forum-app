import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.UP_VOTE_THREAD_DETAIL: {
    if (!threadDetail) return threadDetail;
    const isAlreadyUpVoted = threadDetail.upVotesBy.includes(
      action.payload.userId
    );
    return {
      ...threadDetail,
      upVotesBy: isAlreadyUpVoted
        ? threadDetail.upVotesBy
        : [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: threadDetail.downVotesBy.filter(
        (userId) => userId !== action.payload.userId
      ),
    };
  }
  case ActionType.DOWN_VOTE_THREAD_DETAIL: {
    if (!threadDetail) return threadDetail;
    const isAlreadyDownVoted = threadDetail.downVotesBy.includes(
      action.payload.userId
    );
    return {
      ...threadDetail,
      downVotesBy: isAlreadyDownVoted
        ? threadDetail.downVotesBy
        : [...threadDetail.downVotesBy, action.payload.userId],
      upVotesBy: threadDetail.upVotesBy.filter(
        (userId) => userId !== action.payload.userId
      ),
    };
  }

  case ActionType.NEUTRAL_VOTE_THREAD_DETAIL:
    if (!threadDetail) return threadDetail;
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter(
        (userId) => userId !== action.payload.userId
      ),
      downVotesBy: threadDetail.downVotesBy.filter(
        (userId) => userId !== action.payload.userId
      ),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
