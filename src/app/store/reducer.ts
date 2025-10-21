import { createReducer, on } from '@ngrx/store';
import { initialState } from 'src/app/store/state';
import * as UserAction from 'src/app/store/actions';

export const userReducer = createReducer(
  initialState,

  on(UserAction.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserAction.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UserAction.loadUsersError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserAction.createUserUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
    error: null,
  })),

  on(UserAction.updateUserUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false,
    error: null,
  })),

  on(UserAction.deleteUserUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== id),
    loading: false,
    error: null,
  })),

  on(
    UserAction.createUserUserError,
    UserAction.updateUserUserError,
    UserAction.deleteUserUserError,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(UserAction.setUserFilter, (state, { filters }) => ({ ...state, filters })),
  on(UserAction.clearUserFilter, (state) => ({ ...state, filters: {} })),
);
