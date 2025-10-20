import { Injectable } from '@angular/core';
import { AuthInfo } from 'src/app/services/auth/auth.interface';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/services/base-http-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  private baseAuthUrl = this.baseUrl + '/users';

  public getUsers(): Observable<AuthInfo> {
    return this.http.get<AuthInfo>(this.baseAuthUrl);
  }
}
