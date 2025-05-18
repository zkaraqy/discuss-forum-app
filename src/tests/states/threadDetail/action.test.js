import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ActionType,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
} from '../../../states/threadDetail/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../../utils/api';

// Mock the dependencies
vi.mock('../../../utils/api', () => ({
  api: {
    getThreadDetail: vi.fn(),
    upVoteThread: vi.fn(),
    downVoteThread: vi.fn(),
    neutralVoteThread: vi.fn(),
  },
}));

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe('threadDetail action creators', () => {
  it('should create action correctly when receiveThreadDetail called', () => {
    // Arrange
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    // Action
    const action = receiveThreadDetailActionCreator(threadDetail);

    // Assert
    expect(action).toEqual({
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail },
    });
  });

  it('should create action correctly when clearThreadDetail called', () => {
    // Action
    const action = clearThreadDetailActionCreator();

    // Assert
    expect(action).toEqual({
      type: ActionType.CLEAR_THREAD_DETAIL,
    });
  });

  it('should create action correctly when upVoteThreadDetail called', () => {
    // Arrange
    const userId = 'user-1';

    // Action
    const action = upVoteThreadDetailActionCreator(userId);

    // Assert
    expect(action).toEqual({
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId },
    });
  });

  it('should create action correctly when downVoteThreadDetail called', () => {
    // Arrange
    const userId = 'user-1';

    // Action
    const action = downVoteThreadDetailActionCreator(userId);

    // Assert
    expect(action).toEqual({
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: { userId },
    });
  });

  it('should create action correctly when neutralVoteThreadDetail called', () => {
    // Arrange
    const userId = 'user-1';

    // Action
    const action = neutralVoteThreadDetailActionCreator(userId);

    // Assert
    expect(action).toEqual({
      type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
      payload: { userId },
    });
  });
});

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const threadId = 'thread-1';
    const threadDetail = {
      id: threadId,
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    api.getThreadDetail.mockResolvedValue(threadDetail);

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveThreadDetail(threadId)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(threadDetail)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const threadId = 'thread-1';
    const errorMessage = 'Failed to fetch thread detail';

    api.getThreadDetail.mockRejectedValue(new Error(errorMessage));

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveThreadDetail(threadId)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUpVoteThreadDetail thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when upvote success', async () => {
    // Arrange
    const threadId = 'thread-1';
    const authUser = { id: 'user-1' };

    // Mock getState
    const getState = () => ({ authUser });

    // Mock dispatch
    const dispatch = vi.fn();

    api.upVoteThread.mockResolvedValue({});

    // Action
    await asyncUpVoteThreadDetail(threadId)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadDetailActionCreator(authUser.id)
    );
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
