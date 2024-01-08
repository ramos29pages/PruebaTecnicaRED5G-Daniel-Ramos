export class Account {
    constructor(
      public fecha : Date,
      public numeroDesembolso: number,
      public tipoDocumento: number,
      public numeroDocumento: number,
      public monto : number
    ) { }
  }