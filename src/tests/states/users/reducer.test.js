import { describe, it, expect } from 'vitest';
import usersReducer from '../../../states/users/reducer';
import { ActionType } from '../../../states/users/action';

describe('usersReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = [];
    const action = {};

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [];
    const users = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        id: 'user-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users,
      },
    };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(users);
  });

  it('should return the current state when given unknown action', () => {
    // Arrange
    const initialState = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    ];
    const action = {
      type: 'UNKNOWN_ACTION',
    };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should replace existing users when given RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    ];
    const newUsers = [
      {
        id: 'user-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
      },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: newUsers,
      },
    };

    // Action
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(newUsers);
    expect(nextState).not.toEqual(initialState);
  });
});
