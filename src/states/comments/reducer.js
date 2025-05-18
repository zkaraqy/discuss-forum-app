import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_COMMENTS:
    return action.payload.comments;

  case ActionType.ADD_COMMENT:
    return [...comments, action.payload.comment];

  case ActionType.UP_VOTE_COMMENT:
    return comments.map((comment) => {
      if (comment.id === action.payload.vote.commentId) {
        const isAlreadyUpVoted = comment.upVotesBy.includes(action.payload.vote.userId);
        return {
          ...comment,
          upVotesBy: isAlreadyUpVoted
            ? comment.upVotesBy
            : [...comment.upVotesBy, action.payload.vote.userId],
          downVotesBy: comment.downVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
        };
      }
      return comment;
    });

  case ActionType.DOWN_VOTE_COMMENT:
    return comments.map((comment) => {
      if (comment.id === action.payload.vote.commentId) {
        const isAlreadyDownVoted = comment.downVotesBy.includes(action.payload.vote.userId);
        return {
          ...comment,
          downVotesBy: isAlreadyDownVoted
            ? comment.downVotesBy
            : [...comment.downVotesBy, action.payload.vote.userId],
          upVotesBy: comment.upVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
        };
      }
      return comment;
    });

  case ActionType.NEUTRAL_VOTE_COMMENT:
    return comments.map((comment) => {
      if (comment.id === action.payload.vote.commentId) {
        return {
          ...comment,
          upVotesBy: comment.upVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
          downVotesBy: comment.downVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
        };
      }
      return comment;
    });

  default:
    return comments;
  }
}

export default commentsReducer;