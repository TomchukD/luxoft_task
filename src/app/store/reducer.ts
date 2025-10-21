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
  on(UserAction.createUserSuccess, (state, { user }) => {
    if (!user) return state;
    return {
      ...state,
      users: [...state.users, user],
      loading: false,
      error: null,
    };
  }),

  on(UserAction.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) =>
      u.id.toString() === user.id.toString() ? user : u,
    ),
    loading: false,
    error: null,
  })),

  on(UserAction.deleteUserSuccess, (state, { id }) => {
    const updatedUsers = state.users.filter((u) => +u.id !== +id);
    return { ...state, users: updatedUsers, loading: false, error: null };
  }),

  on(
    UserAction.createUserError,
    UserAction.loadUsersError,
    UserAction.updateUserError,
    UserAction.deleteUserError,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(UserAction.setUserFilter, (state, { filters }) => ({ ...state, filters })),
  on(UserAction.clearUserFilter, (state) => ({ ...state, filters: {} })),
);
