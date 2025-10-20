import { Component } from '@angular/core';
import { UserTable } from 'src/app/components/user-table/user-table';

@Component({
  selector: 'lx-users',
  imports: [UserTable],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListPage {}
