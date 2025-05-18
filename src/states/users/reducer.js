import { ActionType } from './action';

function usersReducer(state = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    return action.payload.users;

  default:
    return state;
  }
}

export default usersReducer;