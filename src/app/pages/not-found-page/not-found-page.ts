import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'lx-not-found-page',
  imports: [RouterLink, Button],
  template: `
    <div class="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 class="text-6xl font-bold text-gray-800  mb-6">404</h1>
      <p-button [raised]="true" severity="secondary" routerLink="/login"
        >Go to Login</p-button
      >
    </div>
  `,
})
export class NotFoundPage {}
