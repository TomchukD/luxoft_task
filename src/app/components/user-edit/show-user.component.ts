import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { User } from 'src/app/services/users/users.interface';
import * as userActions from 'src/app/store/actions';
import { uniqueNicknameValidator } from 'src/app/components/user-edit/validateForm';
import { Message } from 'primeng/message';
import { KeyFilter } from 'primeng/keyfilter';
import { CitiesAutocomplete } from 'src/app/components/cities-autocomplete/cities-autocomplete';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AvatarUpload } from 'src/app/components/avatar/avatar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'lx-user-edit',
  imports: [
    Button,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Message,
    KeyFilter,
    CitiesAutocomplete,
    AvatarUpload,
  ],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.scss',
})
export class ShowUser {
  private store = inject(Store);
  private messageService = inject(MessageService);

  private _user: User | null = null;

  public form: FormGroup = new FormGroup({
    avatar: new FormControl(''),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl(''),
    nickname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    city: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.pattern('[0-9]{10}')]),
    address: new FormControl(''),
  });

  constructor(
    public dialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) {
    if (this.dynamicDialogConfig.data) {
      this._user = this.dynamicDialogConfig.data;
      this.form
        .get('nickname')
        ?.setAsyncValidators(
          uniqueNicknameValidator(
            this.store,
            this._user!.id,
            this._user!.nickname,
          ),
        );
    }

    this.form.patchValue(this.dynamicDialogConfig.data);
    this.form
      .get('nickname')
      ?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  public get formCities(): FormControl {
    return this.form.get('city') as FormControl;
  }
  public get formFirstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  public onSave(): void {
    if (!this._user) {
      const user: User = { ...this.form.value };
      this.store.dispatch(userActions.createUser({ user }));
    } else {
      const user: User = { id: this._user.id, ...this.form.value };
      this.store.dispatch(userActions.updateUser({ user }));
    }
    const message = this._user ? 'Updated' : 'Created';
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `User ${message} successfully!`,
    });
    this.onClose();
  }
  public onClose(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
