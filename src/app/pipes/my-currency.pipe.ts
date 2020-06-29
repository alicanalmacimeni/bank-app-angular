import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (value) {
      var n = Number(value).toFixed(2);
      return n;
    }
  }

}
