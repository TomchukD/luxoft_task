import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/message';

@Component({
  selector: 'lx-login',
  imports: [
    ReactiveFormsModule,
    Button,
    FloatLabel,
    Password,
    InputText,
    Message,
  ],
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  public onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe((v) => {
      localStorage.setItem('role', v[0].role);
      this.router.navigate(['users']).then();
    });
  }
}
