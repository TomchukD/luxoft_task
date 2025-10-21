import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import * as userActions from 'src/app/store/actions';
import { KeyFilter } from 'primeng/keyfilter';
import { CitiesAutocomplete } from 'src/app/components/cities-autocomplete/cities-autocomplete';

@Component({
  selector: 'lx-filter',
  imports: [
    Button,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    KeyFilter,
    CitiesAutocomplete,
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  private store = inject(Store);

  public filterForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    nickname: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  public get formCities(): FormControl {
    return this.filterForm.get('city') as FormControl;
  }

  public onFilter(): void {
    this.store.dispatch(
      userActions.setUserFilter({ filters: this.filterForm.value }),
    );
  }
  public onClearFilter(): void {
    this.filterForm.reset();
    this.store.dispatch(userActions.clearUserFilter());
  }
}
