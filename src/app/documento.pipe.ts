
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documento'
})
export class DocumentoPipe implements PipeTransform {

  transform(value: number): string {
    switch(value) {
      case 1:
        return 'Cédula';
      case 2:
        return 'Tarjeta';
      default:
        return 'Valor no reconocido';
    }
  }

}
