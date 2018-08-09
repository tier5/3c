import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class AgentSearchPipe implements PipeTransform {
  transform(items: any[], term: any): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }
    return items.filter(function (el: any) {
      // check for first name
      const termLower = term.toLowerCase();
      if (el.first_name.toLowerCase().indexOf(termLower) > -1) {
        return el.first_name.toLowerCase().indexOf(termLower) > -1;
      } else {
        // check for last name
        if (el.last_name.toLowerCase().indexOf(termLower) > -1) {
          return el.last_name.toLowerCase().indexOf(termLower) > -1;
        } else {
          // search for company
          if (el.get_company.company.toLowerCase().indexOf(termLower) > -1) {
            return el.get_company.company.toLowerCase().indexOf(termLower) > -1;
          } else {
            // search for email
            if (el.email.toLowerCase().indexOf(termLower) > -1) {
              return el.email.toLowerCase().indexOf(termLower) > -1;
            } else {
              // search for phone
              if (el.phone.replace(/\D+/g, '').indexOf(termLower) > -1) {
                return el.phone.replace(/\D+/g, '').indexOf(termLower) > -1;
              } else {
                // search for date
                if (moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                  return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
                }
              }
            }
          }
        }
      }
    });
  }
}
