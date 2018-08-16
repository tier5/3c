import { Pipe, PipeTransform } from '@angular/core';
import {moment} from '../../../../../../node_modules/ngx-bootstrap/chronos/test/chain';

@Pipe({
  name: 'filter'
})

export class DepartmentSearchPipe implements PipeTransform {
  transform(items: any[], companySearch: any, term: any): any[] {
    if (!items) {
      return [];
    }
    return items.filter(function (el: any) {
      // check for first name
      if (companySearch && companySearch !== '') {
        const companyLower = companySearch.toLowerCase().trim();
        if (el.company_name != null && el.company_name.toLowerCase() === companyLower) {
          if (term && term !== undefined) {
            const termLower = term.toLowerCase().trim();
            if (el.department_name != null && el.department_name.toLowerCase().indexOf(termLower) > -1) {
              return el.department_name.toLowerCase().indexOf(termLower) > -1;
            } else {
              // check for department details
              if (el.department_details != null && el.department_details.toLowerCase().indexOf(termLower) > -1) {
                return el.department_details.toLowerCase().indexOf(termLower) > -1;
              } else {
                // search for company name
                if (el.company_name != null && el.company_name.toLowerCase().indexOf(termLower) > -1) {
                  return el.company_name.toLowerCase().indexOf(termLower) > -1;
                } else {
                  // check with date field
                  if (el.created_at != null && moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                    return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
                  }
                }
              }
            }
          } else {
            return el.company_name.toLowerCase() === companyLower;
          }
        }
      } else if (companySearch === '' && term !== undefined) {
        const termLower = term.toLowerCase().trim();
        if (el.department_name != null && el.department_name.toLowerCase().indexOf(termLower) > -1) {
          return el.department_name.toLowerCase().indexOf(termLower) > -1;
        } else {
          // check for department details
          if (el.department_details != null && el.department_details.toLowerCase().indexOf(termLower) > -1) {
            return el.department_details.toLowerCase().indexOf(termLower) > -1;
          } else {
            // search for company name
            if (el.company_name != null && el.company_name.toLowerCase().indexOf(termLower) > -1) {
              return el.company_name.toLowerCase().indexOf(termLower) > -1;
            } else {
              // check with date field
              if (el.created_at != null && moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1) {
                return moment(el.created_at).format('MMMM DD YYYY').toLowerCase().indexOf(termLower) > -1;
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
