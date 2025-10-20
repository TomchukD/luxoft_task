import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'lx-user-page',
  imports: [ReactiveFormsModule, InputText, AutoCompleteModule],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage {
  userForm: FormGroup;
  cities = [
    { label: 'Kyiv', value: 'Kyiv' },
    { label: 'Lviv', value: 'Lviv' },
    { label: 'Odessa', value: 'Odessa' },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      nickname: ['', Validators.required],
      city: [''],
      phone: ['', [Validators.pattern(/^\d*$/)]],
      email: ['', [Validators.email]],
      address: [''],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
