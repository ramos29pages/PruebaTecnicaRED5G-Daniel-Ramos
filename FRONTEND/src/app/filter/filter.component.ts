import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() activeFilters: boolean = false;
  @Input() numeroDocumento: boolean = false;
  @Input() numeroId: boolean = false;
  @Input() fechaPago: boolean = false;
  @Input() showFilters: boolean = false;

  formFilter!: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.formFilter = new FormGroup({
      numeroDocumento: new FormControl(''),
      numeroId: new FormControl(''),
      fechaPago: new FormControl(''),
    });

    this.formFilter.valueChanges.subscribe((values) => {
      // Aquí se ejecuta cada vez que cambia el valor de alguno de los inputs
      console.log(values); // Puedes ver los valores actuales del formulario
      let valores : boolean = Object.values(this.formFilter.value).some(value => value != null && value != undefined && value != '');

      this.activeFilters = valores ? true : false;

      /*
      this.http.get('https://api.example.com/filter', {params: values}) // Puedes hacer la llamada get a la API con los valores como parámetros
        .subscribe(response => {
          // Aquí puedes procesar la respuesta de la API
          console.log(response);
        });

        */
    });

  }

  clearFormFilter(){
      this.formFilter.reset();
  }
}
