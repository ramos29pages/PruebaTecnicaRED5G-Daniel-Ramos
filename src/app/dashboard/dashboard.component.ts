import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Account } from '../models/account.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  filteredAccounts: any;
  totalRegisters: number = 0;
  tipoDocumento!: string;
  numeroDocumento!: string;
  numeroDesembolso!: string;
  fechaInicio!: string;
  fechaFinal!: string;
  label: boolean = false;
  activeFilters: boolean = false;
  pages!: string;

  ngOnInit() {
    this.filteredAccounts = this.authService.getAllAcounts();
    this.totalRegisters = this.authService.getAllAcounts().length;

    setTimeout(() => {
      this.showTransaction();
    }, 2500);
  }

  constructor(private authService: AuthService, private router: Router) {}

  aplicarFiltro() {
    let cuentas = this.authService.getAllAcounts();

    if (this.tipoDocumento && this.tipoDocumento.trim().length > 0) {
      cuentas = cuentas.filter(
        (cuenta) => cuenta.tipoDocumento == parseInt(this.tipoDocumento.trim())
      );
      this.label = true;
      this.activeFilters = true;
    }

    if (this.numeroDocumento && this.numeroDocumento.trim().length > 0) {
      cuentas = cuentas.filter(
        (cuenta) =>
          cuenta.numeroDocumento == parseInt(this.numeroDocumento.trim())
      );
      this.activeFilters = true;
    }

    if (this.numeroDesembolso && this.numeroDesembolso.trim().length > 0) {
      cuentas = cuentas.filter(
        (cuenta) =>
          cuenta.numeroDesembolso == parseInt(this.numeroDesembolso.trim())
      );
    }

    if (this.fechaInicio && this.fechaInicio.trim().length > 0) {
      let fechaInicioDate = new Date(this.fechaInicio);
      cuentas = cuentas.filter(
        (cuenta) => new Date(cuenta.fecha) >= fechaInicioDate
      );
      this.activeFilters = true;
    }

    if (this.fechaFinal && this.fechaFinal.trim().length > 0) {
      let fechaFinalDate = new Date(this.fechaFinal);
      cuentas = cuentas.filter(
        (cuenta) => new Date(cuenta.fecha) <= fechaFinalDate
      );
      this.activeFilters = true;
    }

    this.filteredAccounts = cuentas;
  }

  paginarArray(array: any, elementosPorPagina: number) {
    let paginas = [];

    for (let i = 0; i < array.length; i += elementosPorPagina) {
      let pagina = array.slice(i, i + elementosPorPagina);
      paginas.push({ pagina: pagina });
    }

    return paginas;
  }

  getPages() {
    if (this.pages && this.pages.trim().length > 0) {
      console.log(
        (this.filteredAccounts = this.paginarArray(
          this.filteredAccounts,
          parseInt(this.pages)
        ))
      );

      this.totalRegisters = this.filteredAccounts.length;
    } else {
      this.aplicarFiltro();
      this.totalRegisters = this.authService.getAllAcounts().length;
    }
  }

  descargarRegistros() {
    // Convertir los datos a CSV
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
    link.click();
  }

  goHome() {
    Swal.fire({
      title: 'Cerrar sesión',
      html: `<p class="alert" > Estas seguro ? </p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dd3542',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Si, salir',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigate(['']);
      }
    });
  }

  showTransaction() {
    Swal.fire({
      html: `<p class="alert" >Pedro Pérez ha hecho una compra por valor de <b>$1,000.00</b></p>`,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      position : 'bottom-end'
    });
  }
}
