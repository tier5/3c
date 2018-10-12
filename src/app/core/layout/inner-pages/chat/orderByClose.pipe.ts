import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderByClose' })
export class OrderByClosePipe implements PipeTransform {
  transform(records: Array<any>, args?: any): any {
    return records.sort(function(a, b){
      if (a.chat_time.date < b.chat_time.date) {
        return -1 * -1;
      } else if ( a.chat_time.date > b.chat_time.date) {
        return 1 * -1;
      } else {
        return 0;
      }
    });
  }
}
