import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform(records: Array<any>, args?: any): any {
    return records.sort(function(a, b){
      if (a.chatTime.date < b.chatTime.date) {
        return -1 * -1;
      } else if ( a.chatTime.date > b.chatTime.date) {
        return 1 * -1;
      } else {
        return 0;
      }
    });
  }
}
