import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class TwilioSearchPipe implements PipeTransform {
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
      const name = el.user_info != null ? el.user_info.first_name + ' ' + el.user_info.last_name : '';
      const userType = el.user_info != null ? ( el.user_info.type === '1' ? 'Main Account' : 'Subaccount' ) : '';
      if (name != null && name.toLowerCase().indexOf(termLower) > -1) {
        return name.toLowerCase().indexOf(termLower) > -1;
      } else {
        // check for last name
        if ((el.user_info != null && el.user_info.email) && el.user_info.email.toLowerCase().indexOf(termLower) > -1) {
          return el.user_info.email.toLowerCase().indexOf(termLower) > -1;
        } else {
          // search for company
          if (el.twilio_sid != null && el.twilio_sid.toLowerCase().indexOf(termLower) > -1) {
            return el.twilio_sid.toLowerCase().indexOf(termLower) > -1;
          } else {
            // search for email
            if (userType != null && userType.toLowerCase().indexOf(termLower) > -1) {
              return userType.toLowerCase().indexOf(termLower) > -1;
            } else {
              // search for date
              if (el.created_at != null && moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
              }
            }
          }
        }
      }
    });
  }
}
