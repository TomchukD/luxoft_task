import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  PrimeTemplate,
} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { Drawer } from 'primeng/drawer';
import { User } from 'src/app/services/users/users.interface';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/store/actions';
import { Observable } from 'rxjs';
import { selectFilteredUsers } from 'src/app/store/selector';
import { AsyncPipe } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';

import { Toast } from 'primeng/toast';
import { Filter } from 'src/app/components/filter/filter';
import { DialogService } from 'primeng/dynamicdialog';
import { ShowUser } from 'src/app/components/user-edit/show-user.component';
import { Avatar } from 'primeng/avatar';
import { ExportButton } from 'src/app/components/export-button/export-button';
import { Router } from '@angular/router';

@Component({
  selector: 'lx-user-table',
  imports: [
    ReactiveFormsModule,
    PrimeTemplate,
    ConfirmDialog,
    TableModule,
    Button,
    ButtonGroup,
    Drawer,
    AsyncPipe,
    Toast,
    Filter,
    Avatar,
    ExportButton,
  ],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
  providers: [ConfirmationService, MessageService, DialogService],
})
export class UserTable {
  private store = inject(Store);
  private router = inject(Router);

  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  public isAdmin: boolean = localStorage.getItem('role') === 'admin';
  public users$: Observable<User[]> = this.store.select(selectFilteredUsers);

  public selectedUser: User[] = [];

  public visible: boolean = false;

  constructor() {
    this.store.dispatch(userActions.loadUsers());
  }

  public delete(event: Event, id: string): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.store.dispatch(userActions.deleteUser({ id }));

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  public onEdit(data: User): void {
    this.dialogService.open(ShowUser, { header: 'Edit user', data });
  }
  public onNewUser(): void {
    this.dialogService.open(ShowUser, { header: 'Create new user' });
  }

  public onLogout(): void {
    localStorage.removeItem('role');
    this.router.navigate(['login']).then();
  }
}
