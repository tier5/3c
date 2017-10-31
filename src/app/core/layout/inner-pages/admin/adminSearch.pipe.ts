import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class AdminSearchPipe implements PipeTransform {
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
      if (el.first_name != null && el.first_name.toLowerCase().indexOf(termLower) > -1) {
        return el.first_name.toLowerCase().indexOf(termLower) > -1;
      } else {
        // check for last name
        if (el.last_name != null && el.last_name.toLowerCase().indexOf(termLower) > -1) {
          return el.last_name.toLowerCase().indexOf(termLower) > -1;
        } else {
          // search for company
          if (el.company != null && el.company.toLowerCase().indexOf(termLower) > -1) {
            return el.company.toLowerCase().indexOf(termLower) > -1;
          } else {
            // search for email
            if (el.email != null && el.email.toLowerCase().indexOf(termLower) > -1) {
              return el.email.toLowerCase().indexOf(termLower) > -1;
            } else {
              // search for phone
              if (el.phone != null && el.phone.replace(/\D+/g, '').indexOf(termLower) > -1) {
                return el.phone.replace(/\D+/g, '').indexOf(termLower) > -1;
              } else {
                // search for date
                if (el.created_at != null && moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                  return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
                } else {
                  // search by twillio sid
                  if ((el.twilio_info != null && el.twilio_info.twilio_sid != null) &&
                    el.twilio_info.twilio_sid.toLowerCase().indexOf(termLower) > -1) {
                    return el.twilio_info.twilio_sid.toLowerCase().indexOf(termLower) > -1;
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}
