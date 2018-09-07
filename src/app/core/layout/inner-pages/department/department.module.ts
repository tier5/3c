import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CreateDepartmentComponent} from './create-department/create-department.component';
import {ListDepartmentComponent} from './list-department/list-department.component';
import {DepartmentRoutingModule} from './department-routing.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {OrderModule} from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MomentModule } from 'angular2-moment';
import { DepartmentSearchPipe } from './departmentSearch.pipe';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        FormsModule,
        Ng2SearchPipeModule,
        OrderModule,
        NgxPaginationModule,
        MomentModule,
        AngularMultiSelectModule,
        ModalModule.forRoot(),
        TextMaskModule,
    ],
    declarations: [
        CreateDepartmentComponent,
        ListDepartmentComponent,
        DepartmentSearchPipe
    ]
})
export class DepartmentModule {
}
