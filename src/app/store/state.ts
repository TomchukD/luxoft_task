import { User } from 'src/app/services/users/users.interface';

export interface UserState {
  users: User[];
  userFilterList: User[];
  loading: boolean;
  filters: Partial<Record<keyof User, string>>;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  userFilterList: [],
  filters: {},

  error: null,
  loading: false,
};
