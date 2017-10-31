import {Pipe, PipeTransform} from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class AgentSearchPipe implements PipeTransform {
  transform(items: any[], companySearch: any, term: any): any[] {
    if (!items) {
      return [];
    }
    /*if (!term || !companySearch) {
      return items;
    }*/
    return items.filter(function (el: any) {
      // check for first name
      if (companySearch && companySearch !== '') {
        const companyLower = companySearch.toLowerCase().trim();
        if ((el.get_company != null && el.get_company.company != null) && el.get_company.company.toLowerCase() === companyLower) {
          if (term && term !== undefined) {
            const termLower = term.toLowerCase().trim();
            if (el.first_name != null && el.first_name.toLowerCase().indexOf(termLower) > -1) {
              return el.first_name.toLowerCase().indexOf(termLower) > -1;
            } else {
              // check for last name
              if (el.last_name != null && el.last_name.toLowerCase().indexOf(termLower) > -1) {
                return el.last_name.toLowerCase().indexOf(termLower) > -1;
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
                    }
                  }
                }
              }
            }
          } else {
            return el.get_company.company.toLowerCase() === companyLower;
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
            // search for company
            if ((el.get_company != null && el.get_company.company != null) && el.get_company.company.toLowerCase().indexOf(termLower) > -1) {
              return el.get_company.company.toLowerCase().indexOf(termLower) > -1;
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
