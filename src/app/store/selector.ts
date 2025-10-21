import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/store/state';
import { User } from 'src/app/services/users/users.interface';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users,
);

export const selectUserFilter = createSelector(
  selectUserState,
  (state: UserState) => state.filters,
);
export const selectFilteredUsers = createSelector(
  selectUsers,
  selectUserFilter,
  (users, filter) => {
    return users.filter((user) =>
      Object.keys(filter).every((key) => {
        const filterValue =
          filter[key as keyof typeof filter]?.toLowerCase() || '';
        const userValue = (user[key as keyof User] || '')
          .toString()
          .toLowerCase();
        return userValue.includes(filterValue);
      }),
    );
  },
);

export const selectUsersLoad = createSelector(
  selectUserState,
  (state) => state.loading,
);
