import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {CreateDepartmentComponent} from './create-department/create-department.component';
import {ListDepartmentComponent} from './list-department/list-department.component';
import {DepartmentRoutingModule} from './department-routing.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        FormsModule,
        Ng2SearchPipeModule,
        OrderModule,
        NgxPaginationModule
    ],
    declarations: [
        CreateDepartmentComponent,
        ListDepartmentComponent
    ]
})
export class DepartmentModule {
}
