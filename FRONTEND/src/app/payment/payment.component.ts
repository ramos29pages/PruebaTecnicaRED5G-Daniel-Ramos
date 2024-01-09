import { HttpClient } from '@angular/common/http';
import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  data!: any[][];
  columns!: string[];

  constructor(private uploadService: UploadService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.uploadService.getPayments().subscribe({
      next: (data) => {
        let requiredFields : any[] = data.map((obj: any) => {
          return {
            id_pago: obj.id_pago,
            documento: obj.documento,
            nombre: obj.nombre,
            monto: obj.monto,
            fecha_pago: obj.fecha_pago,
            estado: obj.estado,
          };
        });

        console.log(requiredFields);

        this.columns = Object.keys(requiredFields[0]);
        this.data = requiredFields.map((obj: any) => Object.values(obj));
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  goHome = () =>  {
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
}
