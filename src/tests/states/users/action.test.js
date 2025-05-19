/**
 * test scenarios for users action creators and thunk functions
 *
 * - users action creators
 *   - should create action correctly when receiveUsers called
 *
 * - asyncReceiveUsers thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 *
 * - asyncRegisterUser thunk
 *   - should dispatch action correctly when registration success
 *   - should dispatch action correctly when registration failed
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ActionType,
  asyncReceiveUsers,
  asyncRegisterUser,
  receiveUsersActionCreator,
} from '../../../states/users/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../../utils/api';

// Mock the dependencies
vi.mock('../../../utils/api', () => ({
  api: {
    getAllUsers: vi.fn(),
    register: vi.fn(),
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

describe('users action creators', () => {
  it('should create action correctly when receiveUsers called', () => {
    // Arrange
    const users = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    ];

    // Action
    const action = receiveUsersActionCreator(users);

    // Assert
    expect(action).toEqual({
      type: ActionType.RECEIVE_USERS,
      payload: { users },
    });
  });
});

describe('asyncReceiveUsers thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const users = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    ];

    api.getAllUsers.mockResolvedValue(users);

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch users';

    api.getAllUsers.mockRejectedValue(new Error(errorMessage));

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncReceiveUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when registration success', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };

    api.register.mockResolvedValue({});

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncRegisterUser(userData)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalledWith(userData);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when registration failed', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    const errorMessage = 'Email already taken';

    api.register.mockRejectedValue(new Error(errorMessage));

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncRegisterUser(userData)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalledWith(userData);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
