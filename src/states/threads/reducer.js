import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads.sort((a, b) => {
      const scoreA = a.upVotesBy.length - a.downVotesBy.length;
      const scoreB = b.upVotesBy.length - b.downVotesBy.length;
      return scoreB - scoreA;
    });

  case ActionType.ADD_THREAD:
    return [...threads, action.payload.thread];

  case ActionType.UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.vote.threadId) {
        // Pastikan userId tidak duplikat di upVotesBy
        const isAlreadyUpVoted = thread.upVotesBy.includes(
          action.payload.vote.userId
        );
        return {
          ...thread,
          upVotesBy: isAlreadyUpVoted
            ? thread.upVotesBy
            : [...thread.upVotesBy, action.payload.vote.userId],
          // Hapus userId dari downVotesBy jika ada
          downVotesBy: thread.downVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
        };
      }
      return thread;
    });

  case ActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.vote.threadId) {
        // Pastikan userId tidak duplikat di downVotesBy
        const isAlreadyDownVoted = thread.downVotesBy.includes(
          action.payload.vote.userId
        );
        return {
          ...thread,
          downVotesBy: isAlreadyDownVoted
            ? thread.downVotesBy
            : [...thread.downVotesBy, action.payload.vote.userId],
          // Hapus userId dari upVotesBy jika ada
          upVotesBy: thread.upVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
        };
      }
      return thread;
    });

  case ActionType.NEUTRAL_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.vote.threadId) {
        return {
          ...thread,
          // Hapus userId dari kedua array
          upVotesBy: thread.upVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
          downVotesBy: thread.downVotesBy.filter(
            (userId) => userId !== action.payload.vote.userId
          ),
        };
      }
      return thread;
    });

  default:
    return threads;
  }
}

export default threadsReducer;
