import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/services/base-http-service';
import { User } from 'src/app/services/users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  private baseAuthUrl = this.baseUrl + '/users';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseAuthUrl);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseAuthUrl + `/${user.id}`, user);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseAuthUrl, user);
  }

  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.baseAuthUrl + `/${id}`);
  }
}
