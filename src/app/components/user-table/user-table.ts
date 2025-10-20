import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { InputText } from 'primeng/inputtext';
import { Drawer } from 'primeng/drawer';
import { AutoComplete } from 'primeng/autocomplete';
import { ukraineCities } from 'src/app/tool/cities';

@Component({
  selector: 'lx-user-table',
  imports: [
    ReactiveFormsModule,
    PrimeTemplate,
    TableModule,
    Button,
    ButtonGroup,
    InputText,
    Drawer,
    AutoComplete,
  ],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable {
  public visible: boolean = false;
  cities: string[] = ukraineCities;
  filterForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    nickname: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });
  users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      nickname: 'jdoe',
      city: 'asdasd',
      phone: 'asdasd',
      email: 'asdasd',
      address: 'asdasd',
    },
    {
      firstName: 'Anna',
      lastName: 'Smith',
      nickname: 'asmith',
      city: 'asdasd',
      phone: 'asdasd',
      email: 'asdasd',
      address: 'asdasd',
    },
  ];
  edit(i: any): void {}
  delete(i: any): void {}
  onSearch(i: any): void {}
  onFilter(): void {}
  onClearFilter(): void {}
}
