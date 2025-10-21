import { Component, Input } from '@angular/core';
import { ukraineCities } from 'src/app/tool/cities';
import { AutoComplete } from 'primeng/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lx-cities-autocomplete',
  imports: [AutoComplete, FormsModule, ReactiveFormsModule],
  templateUrl: './cities-autocomplete.html',
  styleUrl: './cities-autocomplete.scss',
})
export class CitiesAutocomplete {
  @Input({ required: true }) citiesControl!: FormControl;

  public cities: string[] = ukraineCities;
  public filteredCities: string[] = [];

  public filterCities(event: { query: string }): void {
    const query = event.query.toLowerCase();
    this.filteredCities = this.cities.filter((city) =>
      city.toLowerCase().includes(query),
    );
  }
}
