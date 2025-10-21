import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { selectUsers } from 'src/app/store/selector';
import { User } from 'src/app/services/users/users.interface';

export function uniqueNicknameValidator(
  store: Store,
  currentUserId?: string,
  initialValue?: string,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return new Observable<null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }
    if (initialValue && control.value === initialValue) {
      return of(null);
    }
    return store.select(selectUsers).pipe(
      take(1),
      map((users: User[]) => {
        const exists = users.some(
          (user) =>
            user.nickname === control.value && user.id !== currentUserId,
        );
        return exists ? { nicknameTaken: true } : null;
      }),
    );
  };
}
