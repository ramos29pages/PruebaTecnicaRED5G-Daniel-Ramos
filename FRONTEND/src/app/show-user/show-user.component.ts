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

    this.dataService.getData().subscribe(data=>{
      this.columns = Object.keys(data[0])
      this.data = data.map(obj => Object.values(obj));
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
