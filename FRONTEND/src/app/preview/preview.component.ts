import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  data!: any[][];
  columns!: string[];

  body!: any[];
  toConfirm!: boolean;

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      object: any[];
      toConfirm: boolean;
    };

    this.body = state.object;
    this.toConfirm = state.toConfirm;

    this.columns = Object.keys(this.body[0]);
    this.data = this.body.map((obj) => Object.values(obj));
    console.log(this.body);
  }

  goHome = () => {
    Swal.fire({
      title: 'Cerrar sesión',
      html: `<p class="alert" > Estas seguro ? </p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9553',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, salir',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['']);
        this.router.navigate(['./']);
      }
    });
  };

  return = () => {
    Swal.fire({
      title: 'Exito',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
    }).then((result) => {
      if (result.isDismissed) {
        this.router.navigate(['/dash']);
      }
    });
  };

  sendPayment = async () => {
    console.log('TO_SEND:::', this.body, 'TO_CONFIRM:::', this.toConfirm);
    if (this.toConfirm) {
      let response = await this.http
        .post('http://127.0.0.1:8000/payments-confirm', this.body)
        .toPromise();
      this.return();
    }

    if(!this.toConfirm) {
      let response = await this.http
        .post('http://127.0.0.1:8000/payments-pending', this.body)
        .toPromise();
      this.return();
    }
  };
}
