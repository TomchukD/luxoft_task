import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/services/users/users.interface';

export const loadUsers = createAction('[User] load users');
export const loadUsersSuccess = createAction(
  '[User] load users success',
  props<{ users: User[] }>(),
);
export const loadUsersError = createAction(
  '[User] load users error',
  props<{ error: string }>(),
);

// ########################################

export const updateUser = createAction(
  '[User] update user',
  props<{ user: User }>(),
);
export const updateUserSuccess = createAction(
  '[User] update user success',
  props<{ user: User }>(),
);
export const updateUserError = createAction(
  '[User] update user error',
  props<{ error: string }>(),
);
// ########################################

export const deleteUser = createAction(
  '[User] delete user',
  props<{ id: string }>(),
);
export const deleteUserSuccess = createAction(
  '[User] delete user success',
  props<{ id: string }>(),
);
export const deleteUserError = createAction(
  '[User] delete user error',
  props<{ error: string }>(),
); // ########################################

export const createUser = createAction(
  '[User] create user',
  props<{ user: User }>(),
);
export const createUserSuccess = createAction(
  '[User] create user success',
  props<{ user: User }>(),
);
export const createUserError = createAction(
  '[User] create user error',
  props<{ error: string }>(),
);

// ########################################

export const setUserFilter = createAction(
  '[User] Set Filter',
  props<{ filters: Partial<Record<keyof User, string>> }>(),
);

export const clearUserFilter = createAction('[User] Clear Filter');
