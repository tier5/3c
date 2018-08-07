import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'searchTable'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            let rVal = (val.first_name.toLocaleLowerCase().includes(args)) || (val.last_name.toLocaleLowerCase().includes(args)) || (val.twilio_numbers.toLocaleLowerCase().includes(args)) || (val.widget_department.includes(args));
            return rVal;
        })

    }

}