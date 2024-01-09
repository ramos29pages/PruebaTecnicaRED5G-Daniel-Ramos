import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { GetDataService } from '../get-data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formFile: FormGroup;
  data!: any[][];
  columns!: string[];
  errorFile: boolean = false;
  infoErrorFile: string = '';
  filled: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;
  file: any;

  ngOnInit() {
    this.dataService.getData().subscribe((data) => {
      this.columns = Object.keys(data[0]);
      this.data = data.map((obj) => Object.values(obj));
    });
  }

  constructor(
    private authService: AuthService,
    private dataService: GetDataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formFile = new FormGroup({
      filename: new FormControl(''),
    });
  }

  goToPage = (pageName: string)=> {
    this.router.navigate([pageName]);
  }

  goHome = () => {
    Swal.fire({
      title : 'Estas seguro ?',
      showCancelButton : true,
      cancelButtonText : 'Cancelar',
      confirmButtonColor : '#ff9553',
      confirmButtonText : 'Si, salir',
      timer : 2000,
    }).then(( result) => { if (result.isConfirmed){
      this.router.navigate(['./']);
    }});
  }
}
