import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class TableSearchPipe implements PipeTransform {
  transform(items: any[], companySearch: any, term: any): any[] {
    if (!items) {
      return [];
    }
    return items.filter(function (el: any) {
      // check for first name
      if (companySearch && companySearch !== '') {
        const companyLower = companySearch.toLowerCase().trim();
        if (el.company !== null && el.company.toLowerCase() === companyLower) {
          if (term && term !== undefined) {
            const termLower = term.toLowerCase().trim();
            if (el.first_name != null && el.first_name.toLowerCase().indexOf(termLower) > -1) {
              return el.first_name.toLowerCase().indexOf(termLower) > -1;
            } else {
              // check for last name
              if (el.last_name != null && el.last_name.toLowerCase().indexOf(termLower) > -1) {
                return el.last_name.toLowerCase().indexOf(termLower) > -1;
              } else {
                // search for phone
                if (el.twilio_numbers != null && el.twilio_numbers.replace(/\D+/g, '').indexOf(termLower) > -1) {
                  return el.twilio_numbers.replace(/\D+/g, '').indexOf(termLower) > -1;
                } else {
                  // search for date
                  if (el.created_at != null && moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                    return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
                  } else {
                    // search for department
                    if (el.widget_department != null && el.widget_department.toString().toLowerCase().indexOf(termLower) > -1) {
                      return el.widget_department.toString().toLowerCase().indexOf(termLower) > -1;
                    }
                  }
                }
              }
            }
          } else {
            return el.company.toLowerCase() === companyLower;
          }
        }
      } else if (companySearch === '' && term !== undefined) {
        const termLower = term.toLowerCase().trim();
        if (el.first_name != null && el.first_name.toLowerCase().indexOf(termLower) > -1) {
          return el.first_name.toLowerCase().indexOf(termLower) > -1;
        } else {
          // check for last name
          if (el.last_name != null && el.last_name.toLowerCase().indexOf(termLower) > -1) {
            return el.last_name.toLowerCase().indexOf(termLower) > -1;
          } else {
            // search for phone
            if (el.twilio_numbers != null && el.twilio_numbers.replace(/\D+/g, '').indexOf(termLower) > -1) {
              return el.twilio_numbers.replace(/\D+/g, '').indexOf(termLower) > -1;
            } else {
              // search for date
              if (el.created_at != null && moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
              } else {
                // search for department
                if (el.widget_department != null && el.widget_department.toString().toLowerCase().indexOf(termLower) > -1) {
                  return el.widget_department.toString().toLowerCase().indexOf(termLower) > -1;
                } else {
                  if (el.company != null && el.company.toLowerCase().indexOf(termLower) > -1) {
                    return el.company != null && el.company.toLowerCase().indexOf(termLower) > -1;
                  }
                }
              }
            }
          }
        }
      } else {
        return items;
      }
    });
  }
}
