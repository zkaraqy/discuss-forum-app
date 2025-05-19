/**
 * test scenarios for threadsReducer function
 *
 * - threadsReducer function
 *   - should return the initial state when no action is provided
 *   - should return sorted threads when given RECEIVE_THREADS action
 *   - should add a new thread when given ADD_THREAD action
 *   - should add user to upVotesBy and remove from downVotesBy when given UP_VOTE_THREAD action
 *   - should add user to downVotesBy and remove from upVotesBy when given DOWN_VOTE_THREAD action
 *   - should remove user from both upVotesBy and downVotesBy when given NEUTRAL_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from '../../../states/threads/reducer';
import { ActionType } from '../../../states/threads/action';

describe('threadsReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = [];
    const action = {};

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return sorted threads when given RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = [];
    const threads = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: ['user-1', 'user-2'],
        downVotesBy: [],
      },
      {
        id: 'thread-2',
        title: 'Thread 2',
        body: 'Thread 2 body',
        upVotesBy: ['user-1', 'user-2', 'user-3'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads,
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toHaveLength(2);
    // Expect threads to be sorted by upvotes - downvotes (score)
    expect(nextState[0].id).toBe('thread-2');
    expect(nextState[1].id).toBe('thread-1');
  });

  it('should add a new thread when given ADD_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread 2',
      body: 'Thread 2 body',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toHaveLength(2);
    expect(nextState).toContainEqual(newThread);
  });

  it('should add user to upVotesBy and remove from downVotesBy when given UP_VOTE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        vote: {
          threadId: 'thread-1',
          userId: 'user-1',
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState[0].upVotesBy).toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });

  it('should add user to downVotesBy and remove from upVotesBy when given DOWN_VOTE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        vote: {
          threadId: 'thread-1',
          userId: 'user-1',
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState[0].downVotesBy).toContain('user-1');
    expect(nextState[0].upVotesBy).not.toContain('user-1');
  });

  it('should remove user from both upVotesBy and downVotesBy when given NEUTRAL_VOTE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'Thread 1 body',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        vote: {
          threadId: 'thread-1',
          userId: 'user-1',
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState[0].upVotesBy).not.toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});
