import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class TableSearchPipe implements PipeTransform {
  transform(items: any[], term: any): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }
    return items.filter(function (el: any) {
      // check for first name
      const termLower = term.toLowerCase().trim();
      if (el.first_name.toLowerCase().indexOf(termLower) > -1) {
        return el.first_name.toLowerCase().indexOf(termLower) > -1;
      } else {
        // check for last name
        if (el.last_name.toLowerCase().indexOf(termLower) > -1) {
          return el.last_name.toLowerCase().indexOf(termLower) > -1;
        } else {
          // search for phone
          if (el.twilio_numbers.replace(/\D+/g, '').indexOf(termLower) > -1) {
            return el.twilio_numbers.replace(/\D+/g, '').indexOf(termLower) > -1;
          } else {
            // search for date
            if (moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
              return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
            } else {
              // search for department
              if (el.widget_department.toString().toLowerCase().indexOf(termLower) > -1) {
                return el.widget_department.toString().toLowerCase().indexOf(termLower) > -1;
              }
            }
          }
        }
      }
    });
  }
}
