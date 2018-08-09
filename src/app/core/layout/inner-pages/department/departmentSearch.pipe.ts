import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class DepartmentSearchPipe implements PipeTransform {
  transform(items: any[], term: any): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }
    return items.filter(function (el: any) {
      const termLower = term.toLowerCase().trim();
      // check for department name
      if (el.department_name.toLowerCase().indexOf(termLower) > -1) {
        return el.department_name.toLowerCase().indexOf(termLower) > -1;
      } else {
        // check for department details
        if (el.department_details.toLowerCase().indexOf(termLower) > -1) {
          return el.department_details.toLowerCase().indexOf(termLower) > -1;
        } else {
          // search for company name
          if (el.company_name.toLowerCase().indexOf(termLower) > -1) {
            return el.company_name.toLowerCase().indexOf(termLower) > -1;
          } else {
            // check with date field
            if (moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
              return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
            }
          }
        }
      }
    });
  }
}
