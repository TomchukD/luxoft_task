import { Injectable } from '@angular/core';
import { Auth, AuthInfo } from 'src/app/services/auth/auth.interface';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/services/base-http-service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  private baseAuthUrl = this.baseUrl + '/login';

  public login(user: Auth): Observable<AuthInfo[]> {
    const params = new HttpParams()
      .set('email', user.email)
      .set('password', user.password);
    return this.http.get<AuthInfo[]>(this.baseAuthUrl, { params });
  }
}
