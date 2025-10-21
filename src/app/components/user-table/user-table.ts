import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ConfirmationService,
  MenuItem,
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
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.vfs;

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
    Menubar,
  ],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
  providers: [ConfirmationService, MessageService, DialogService],
})
export class UserTable {
  private store = inject(Store);
  private router = inject(Router);

  public items: MenuItem[] = [
    {
      label: 'Filter',
      icon: 'pi pi-filter',
      command: () => (this.visible = true),
    },
    {
      label: 'Export',
      items: [
        {
          label: 'Print',
          command: () => this.print(),
        },
        {
          label: 'PDF',
          command: () => this.exportPDF(),
        },
        {
          label: 'XLSX',
          command: () => this.exportXLSX(),
        },
        {
          label: 'XLS',
          command: () => this.exportXLS(),
        },
      ],
    },
    {
      label: 'New User',
      icon: 'pi pi-plus',
      command: () => this.onNewUser(),
      visible: true,
    },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onLogout() },
  ];

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

  public exportPDF(): void {
    this.export(this.generatePDF);
  }
  public exportXLSX(): void {
    this.export(this.generateXLSX);
  }
  public exportXLS(): void {
    this.export(this.generateXLS);
  }

  private export(callBack: (user: User[]) => void): void {
    this.users$
      .subscribe((u) => {
        const exportData = this.selectedUser.length > 0 ? this.selectedUser : u;
        callBack(exportData);
      })
      .unsubscribe();
  }

  private generatePDF(users: User[]): void {
    const docDefinition = {
      content: [
        { text: 'Users', style: 'header' },
        {
          table: {
            body: [
              [
                'Avatar',
                'First Name',
                'Last Name',
                'Nickname',
                'City',
                'Phone',
                'Email',
                'Address',
              ],
              ...users.map((u) => [
                u.avatar
                  ? { image: u.avatar, width: 50, height: 50 }
                  : 'No photo',
                u.firstName,
                u.lastName,
                u.nickname,
                u.city,
                u.email,
                u.phone,
                u.address,
              ]),
            ],
          },
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download('users.pdf');
  }

  private generateXLSX(users: User[]): void {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  }

  private generateXLS(users: User[]): void {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xls');
  }

  private print(): void {
    this.export((users: User[]) => {
      const printContent = this.generateTableHTML(users);

      const popupWin = window.open('', '_blank', 'width=800,height=600');
      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
        <html>
          <head>
            <title>Print Users</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f5f5f5; }
            </style>
          </head>
          <body onload="window.print(); window.close()">
            ${printContent}
          </body>
        </html>
      `);
        popupWin.document.close();
      }
    });
  }

  private generateTableHTML(users: User[]): string {
    const headers = [
      'Avatar',
      'First Name',
      'Last Name',
      'Nickname',
      'City',
      'Phone',
      'Email',
      'Address',
    ];

    const thead = `<tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>`;

    const tbody = users
      .map(
        (u) => `<tr>
              <td>${u.avatar}</td>
              <td>${u.firstName}</td>
              <td>${u.lastName}</td>
              <td>${u.nickname}</td>
              <td>${u.city}</td>
              <td>${u.phone}</td>
              <td>${u.email}</td>
              <td>${u.address}</td>
            </tr>`,
      )
      .join('');

    return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
  }
}
