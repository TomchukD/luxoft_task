import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAction from 'src/app/store/actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { User } from 'src/app/services/users/users.interface';
import { UsersService } from 'src/app/services/users/Users.service';

@Injectable()
export class UserEffect {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users: User[]) => UserAction.loadUsersSuccess({ users })),
          catchError((error) => of(UserAction.loadUsersError(error))),
        ),
      ),
    ),
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.updateUser),
      mergeMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map(() => UserAction.updateUserUserSuccess({ user: action.user })),
          catchError((error) => of(UserAction.updateUserUserError(error))),
        ),
      ),
    ),
  );
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.createUser),
      mergeMap((action) =>
        this.usersService.createUser(action.user).pipe(
          map(() => UserAction.createUserUserSuccess({ user: action.user })),
          catchError((error) => of(UserAction.createUserUserError(error))),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.deleteUser),
      mergeMap((action) =>
        this.usersService.deleteUser(action.id).pipe(
          map(() => UserAction.deleteUserUserSuccess({ id: action.id })),
          catchError((error) => of(UserAction.deleteUserUserError(error))),
        ),
      ),
    ),
  );
}
