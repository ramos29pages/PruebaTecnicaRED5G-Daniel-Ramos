import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})

export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; 
    return value.split(' ') 
      .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' '); 
  }
}
