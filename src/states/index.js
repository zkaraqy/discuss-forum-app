import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import commentsReducer from './comments/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    comments: commentsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;

/**
 * {
  authUser: null, // atau data pengguna yang sedang login
  isPreload: true, // atau false
  threads: [], // daftar threads
  threadDetail: null, // detail thread tertentu
  comments: [], // daftar komentar
  users: { users: [], ownProfile: null }, // daftar pengguna dan profil pengguna yang sedang login
}
 */
