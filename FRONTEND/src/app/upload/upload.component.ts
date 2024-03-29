import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  formFile: FormGroup;
  data!: any[][];
  columns!: string[];
  errorFile: boolean = false;
  infoErrorFile: string = '';
  filled: boolean = false;
  csvData: any;

  @ViewChild('fileInput') fileInput!: ElementRef;
  file: any;

  ngOnInit() {
    this.dataService.getData().subscribe((data) => {
      this.columns = Object.keys(data[0]);
      this.data = data.map((obj) => Object.values(obj));
    });
  }

  constructor(
    private dataService: GetDataService,
    private uploadFileService: UploadService,
    private router: Router
  ) {
    this.formFile = new FormGroup({
      filename: new FormControl(''),
    });
  }

  async selectFile() {
    await this.fileInput.nativeElement.click();
  }

  async uploadFileToConfirm() {
    if (this.errorFile == false) {
      let object = await this.uploadFileService.uploadFile(this.file);
      console.log('DATA_IN_COMPONENT:::', object);

      let navigationExtras: NavigationExtras = {
        state: {
          object: object,
          toConfirm: true,
        },
      };

      this.router.navigate(['/preview'], navigationExtras);
    }
  }

  async uploadFileToUpload() {
    if (this.errorFile == false) {
      let object = await this.uploadFileService.uploadFile(this.file);
      console.log('DATA_IN_COMPONENT:::', object);

      let navigationExtras: NavigationExtras = {
        state: {
          object: object,
          toConfirm: false,
        },
      };

      this.router.navigate(['/preview'], navigationExtras);
    }
  }

  validateFile(): boolean {
    this.file = this.fileInput.nativeElement.files[0];
    if (this.file) {
      let extension = this.file.name.split('.').pop();
      if (extension == 'xlsx' || extension == 'csv') {
        this.formFile.get('filename')?.setValue(this.file.name);
        this.infoErrorFile = '';
        this.filled = true;
        this.errorFile = false;
        return !this.errorFile;
      } else {
        this.errorFile = true;
        this.infoErrorFile = 'La extension del archivo debe ser .xlsx o .csv';
        return !this.errorFile;
      }
    } else {
      this.errorFile = true;
      this.infoErrorFile = 'Selecciona un acrhivo .xlsx o .csv';
      return !this.errorFile;
    }
  }

  goHome = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff9553',
      confirmButtonText: 'Si, salir',
    }).then(( result) => { if (result.isConfirmed){
      this.router.navigate(['dash'])
    }});
  }

  // Esta función se ejecuta cuando cambia el valor del input de tipo file
  fileChangeEvent(fileInput: any) {
    let file = fileInput.target.files[0]; // Obtiene el archivo seleccionado
  }
}
