/**
 * test scenarios for threads action creators and thunk functions
 *
 * - threads action creators
 *   - should create action correctly when receiveThreads called
 *   - should create action correctly when addThread called
 *   - should create action correctly when upVoteThread called
 *   - should create action correctly when downVoteThread called
 *   - should create action correctly when neutralVoteThread called
 *
 * - asyncReceiveThreads thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 *
 * - asyncAddThread thunk
 *   - should dispatch action correctly when thread creation success
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ActionType,
  asyncAddThread,
  asyncReceiveThreads,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
} from '../../../states/threads/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../../utils/api';

// Mock the dependencies
vi.mock('../../../utils/api', () => ({
  api: {
    getAllThreads: vi.fn(),
    createThread: vi.fn(),
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

describe('threads action creators', () => {
  it('should create action correctly when receiveThreads called', () => {
    // Arrange
    const threads = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    // Action
    const action = receiveThreadsActionCreator(threads);

    // Assert
    expect(action).toEqual({
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    });
  });

  it('should create action correctly when addThread called', () => {
    // Arrange
    const thread = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
    };

    // Action
    const action = addThreadActionCreator(thread);

    // Assert
    expect(action).toEqual({
      type: ActionType.ADD_THREAD,
      payload: { thread },
    });
  });

  it('should create action correctly when upVoteThread called', () => {
    // Arrange
    const threadId = 'thread-1';
    const userId = 'user-1';

    // Action
    const action = upVoteThreadActionCreator({ threadId, userId });

    // Assert
    expect(action).toEqual({
      type: ActionType.UP_VOTE_THREAD,
      payload: { vote: { threadId, userId } },
    });
  });

  it('should create action correctly when downVoteThread called', () => {
    // Arrange
    const threadId = 'thread-1';
    const userId = 'user-1';

    // Action
    const action = downVoteThreadActionCreator({ threadId, userId });

    // Assert
    expect(action).toEqual({
      type: ActionType.DOWN_VOTE_THREAD,
      payload: { vote: { threadId, userId } },
    });
  });

  it('should create action correctly when neutralVoteThread called', () => {
    // Arrange
    const threadId = 'thread-1';
    const userId = 'user-1';

    // Action
    const action = neutralVoteThreadActionCreator({ threadId, userId });

    // Assert
    expect(action).toEqual({
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: { vote: { threadId, userId } },
    });
  });
});

describe('asyncReceiveThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const threads = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    api.getAllThreads.mockResolvedValue(threads);

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(threads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch threads';

    api.getAllThreads.mockRejectedValue(new Error(errorMessage));

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator([]));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when thread creation success', async () => {
    // Arrange
    const threadData = {
      title: 'Thread 1',
      body: 'Thread 1 body',
      category: 'General',
    };

    const createdThread = {
      ...threadData,
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [],
    };

    api.createThread.mockResolvedValue(createdThread);

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncAddThread(threadData)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.createThread).toHaveBeenCalledWith(threadData);
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(createdThread)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
