import { describe, it, expect } from 'vitest';
import authUserReducer from '../../../states/authUser/reducer';
import { ActionType } from '../../../states/authUser/action';

describe('authUserReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = null;
    const action = {};

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the user data when given SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const userData = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: userData,
      },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(userData);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should return the current state when given unknown action', () => {
    // Arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = {
      type: 'UNKNOWN_ACTION',
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });
});
