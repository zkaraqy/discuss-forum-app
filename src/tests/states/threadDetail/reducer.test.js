/**
 * test scenarios for threadDetailReducer function
 *
 * - threadDetailReducer function
 *   - should return the initial state when no action is provided
 *   - should return thread detail when given RECEIVE_THREAD_DETAIL action
 *   - should return null when given CLEAR_THREAD_DETAIL action
 *   - should add user to upVotesBy and remove from downVotesBy when given UP_VOTE_THREAD_DETAIL action
 *   - should add user to downVotesBy and remove from upVotesBy when given DOWN_VOTE_THREAD_DETAIL action
 *   - should remove user from both upVotesBy and downVotesBy when given NEUTRAL_VOTE_THREAD_DETAIL action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from '../../../states/threadDetail/reducer';
import { ActionType } from '../../../states/threadDetail/action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = null;
    const action = {};

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = null;
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail,
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should add user to upVotesBy and remove from downVotesBy when given UP_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: [],
      downVotesBy: ['user-1'],
      comments: [],
    };
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should add user to downVotesBy and remove from upVotesBy when given DOWN_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.downVotesBy).toContain('user-1');
    expect(nextState.upVotesBy).not.toContain('user-1');
  });

  it('should remove user from both upVotesBy and downVotesBy when given NEUTRAL_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1 body',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState.upVotesBy).not.toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });
});
