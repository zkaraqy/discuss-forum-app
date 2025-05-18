import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ActionType,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from '../../../states/authUser/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../../utils/api';

// Mock the dependencies
vi.mock('../../../utils/api', () => ({
  api: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
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

describe('authUser action creators', () => {
  it('should create action correctly when setAuthUser called', () => {
    // Arrange
    const authUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
    };

    // Action
    const action = setAuthUserActionCreator(authUser);

    // Assert
    expect(action).toEqual({
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    });
  });

  it('should create action correctly when unsetAuthUser called', () => {
    // Action
    const action = unsetAuthUserActionCreator();

    // Assert
    expect(action).toEqual({
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    });
  });
});

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when login success', async () => {
    // Arrange
    const fakeToken = 'fake-token';
    const fakeUser = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const fakeUserAuth = {
      email: 'john@example.com',
      password: 'password',
    };

    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    const result = await asyncSetAuthUser(fakeUserAuth)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith(fakeUserAuth);
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(true);
  });

  it('should dispatch action correctly when login failed', async () => {
    // Arrange
    const fakeUserAuth = {
      email: 'john@example.com',
      password: 'wrong-password',
    };
    const errorMessage = 'Invalid credentials';

    api.login.mockRejectedValue(new Error(errorMessage));

    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    const result = await asyncSetAuthUser(fakeUserAuth)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith(fakeUserAuth);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(false);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly', () => {
    // Arrange
    // Mock dispatch
    const dispatch = vi.fn();

    // Action
    asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
