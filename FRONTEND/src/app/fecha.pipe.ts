import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform( value : Date): string {
    return value.toISOString().substring(0,10);
  }

}
