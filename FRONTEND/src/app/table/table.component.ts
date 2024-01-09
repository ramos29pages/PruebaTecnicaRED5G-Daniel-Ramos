import { GetDataService } from './../get-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() titleButton: string = 'titulo del boton';
  @Input() titleTable: string = 'titulo de la seccion';
  @Input() showButton: boolean = false;
  @Input() onButtonClick!: Function;
  @Input() showFilter: boolean = false;
  @Input() data!: any[][];
  @Input() columns!: string[];
  @Input() errorLogIcon: boolean = false;

  constructor(private dataService: GetDataService) {}

  ngOnInit(): void {
    //
  }
}
