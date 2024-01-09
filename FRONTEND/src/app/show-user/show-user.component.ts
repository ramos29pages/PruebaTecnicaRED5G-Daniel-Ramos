import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})

export class ShowUserComponent implements OnInit {

  data !: any[][];
  columns !: string[];

  constructor(private router: Router, private dataService: GetDataService){}

  ngOnInit() {

    this.dataService.getData().subscribe({
      next: (data) => {
        let requiredFields : any[] = data.map((obj: any) => {
          return {
            id: obj.id,
            dni: obj.dni,
            name: obj.name,
            username: obj.username,
            Role: obj.is_admin ? 'admin' : '',
            Payments: obj.payments,
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

  goHome = () =>{
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
  }
}
