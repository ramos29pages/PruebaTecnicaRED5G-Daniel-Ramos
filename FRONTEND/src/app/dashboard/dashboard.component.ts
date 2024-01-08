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

  descargarRegistros() {
    /* Convertir los datos a CSV
    let csv =
      'Fecha y hora,Numero de desembolso,Tipo de documento,Numero de documento,Monto\n';
    this.filteredAccounts.forEach((account: Account) => {
      csv += `${account?.fecha},${account?.numeroDesembolso},${account?.tipoDocumento},${account.numeroDocumento},${account.monto}\n`;
    });

    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = 'registros.csv';
    link.click();*/
  }

  async selectFile () {
    await this.fileInput.nativeElement.click(); // Esto activa el input oculto
  }

  async uploadFile() {
    this.file =  await this.fileInput.nativeElement.files[0]; // Esto obtiene el archivo seleccionado y lo asigna a la propiedad file
    if (this.file) {
      // Esto verifica que file no sea undefined
      let extension = this.file.name.split('.').pop(); // Esto obtiene la extensión del nombre del archivo
      if (extension == 'xlsx' || extension == 'csv') {
        console.log(extension);
        this.formFile.get('filename')?.setValue(this.file.name);
        this.infoErrorFile = '';
        this.filled = true;
        this.errorFile = false;

      } else {
        this.errorFile = true;
        this.infoErrorFile = 'La extension del archivo debe ser .xlsx o .csv';
      }
    } else {
      this.errorFile = true;
      this.infoErrorFile = 'Selecciona un acrhivo .xlsx o .csv';
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([pageName]); // Esto redirige a la ruta especificada
  }

  goHome() {
    Swal.fire({
      title : 'Estas seguro ?',
      showCancelButton : true,
      cancelButtonText : 'Cancelar',
      confirmButtonColor : '#ff9553',
      confirmButtonText : 'Si, salir',
      timer : 2000,
    });
  }
}
