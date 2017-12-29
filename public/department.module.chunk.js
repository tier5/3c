webpackJsonp(["department.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n        <h1>Department Section</h1>\n        <ol class=\"breadcrumb\">\n            <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n            <li><a href=\"#\">Tables</a></li>\n            <li class=\"active\">Data tables</li>\n        </ol>\n    </section>\n    <section class=\"content\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box box-primary\">\n                    <!-- /.box-header -->\n                    <div class=\"box-body\" *ngIf=\"(authState | async).twilioIsActive\">\n                        <form #form=\"ngForm\" (submit)=\"onCreateDep(form)\">\n                            <!-- text input -->\n                            <div class=\"box-header with-border\">\n                                <h3 class=\"box-title\">{{ editMode ? 'Edit' : 'Create' }} Department</h3>\n                            </div>\n                            <div class=\"col-md-12\">\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group\">\n                                            <label class=\"control-label\" for=\"admin\">\n                                                Admin for Department\n                                            </label>\n                                            <select class=\"form-control\"\n                                                    id=\"admin\"\n                                                    name=\"userId\"\n                                                    [disabled]=\"editMode || (authState | async).isAdmin\"\n                                                    #selected\n                                                    [(ngModel)]=\"dep.userId\">\n                                                <option selected value=\"0\">Choose...</option>\n                                                <option [value]=\"item.id\"\n                                                        *ngFor=\"let item of (afterLoginState | async).admin.list; let i = index\"\n                                                >\n                                                    {{item.first_name}} {{item.last_name}}\n                                                </option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-md-6\" *ngIf=\"selected.value > 0\">\n                                <div class=\"form-group\" [ngClass]=\"(dName.invalid && dName.touched) ? 'has-error': ''\">\n                                    <label class=\"control-label\" for=\"name\">\n                                        <i *ngIf=\"dName.invalid && dName.touched\" class=\"fa fa-times-circle-o\"></i>\n                                        Department Name\n                                    </label>\n                                    <input type=\"text\"\n                                           class=\"form-control\"\n                                           id=\"name\"\n                                           name=\"departmentName\"\n                                           [ngModel]=\"dep.departmentName\"\n                                           #dName=\"ngModel\"\n                                           required\n                                           placeholder=\"Enter ...\"\n                                    >\n                                    <span *ngIf=\"dName.invalid && dName.touched\" class=\"help-block\">Your Department Name is Required!</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-6\" *ngIf=\"selected.value > 0\">\n                                <div class=\"form-group\" [ngClass]=\"{ 'has-error': dDes.invalid && dDes.touched }\">\n                                    <label class=\"control-label\" for=\"detail\">\n                                        <i *ngIf=\"dDes.invalid && dDes.touched\" class=\"fa fa-times-circle-o\"></i>\n                                        Department Description\n                                    </label>\n                                    <input type=\"text\"\n                                           class=\"form-control\"\n                                           id=\"detail\"\n                                           name=\"departmentDetails\"\n                                           ngModel\n                                           [ngModel]=\"dep.departmentDetails\"\n                                           #dDes=\"ngModel\"\n                                           required\n                                           placeholder=\"Enter ...\"\n                                    >\n                                    <span *ngIf=\"dDes.invalid && dDes.touched\" class=\"help-block\">Your Department Description is Required!</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-12\">\n                                <div class=\"box-footer\">\n                                    <button type=\"submit\"\n                                            [disabled]=\"form.invalid || selected.value <= 0\"\n                                            class=\"btn btn-primary pull-right\"\n                                    >\n                                        Submit\n                                    </button>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"box-body\" *ngIf=\"!(authState | async).twilioIsActive\">\n                        <h4>Twilio Credentials Not Added by SuperAdmin :-(</h4>\n                    </div>\n                    <!-- /.box-body -->\n                </div>\n            </div>\n            <!-- /.col -->\n        </div>\n        <!-- /.row -->\n    </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateDepartmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_admin_admin_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/admin/admin.actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_department_department_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/department/department.actions.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateDepartmentComponent = (function () {
    /** Service injection */
    function CreateDepartmentComponent(store, activatedRoute, cdr) {
        this.store = store;
        this.activatedRoute = activatedRoute;
        this.cdr = cdr;
        this.editMode = false;
        this.dep = {
            userId: 0,
            departmentName: '',
            departmentDetails: ''
        };
    }
    /** Function to be executed when component initializes */
    CreateDepartmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_admin_admin_actions__["q" /* GetAdminListAttempt */]());
        this.authState = this.store.select('auth');
        this.afterLoginState = this.store.select('afterLogin');
        this.authSubscription = this.store.select('auth')
            .subscribe(function (data) {
            if (data.isAdmin) {
                _this.dep.userId = data.userId;
                _this.loggedInAdminId = data.userId;
            }
        });
        this.afterLoginSubscription = this.store.select('afterLogin')
            .map(function (data) { return data.department.resetDepartmentForm; })
            .subscribe(function (data) {
            if (data) {
                _this.form.reset();
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_department_department_actions__["n" /* ResetDepartmentForm */]());
                if (!!_this.loggedInAdminId) {
                    _this.form.form.patchValue({ userId: _this.loggedInAdminId });
                }
            }
        });
        this.activatedRoute.data
            .subscribe(function (data) {
            _this.editMode = data['editMode'];
            /** Perform operation is present mode is edit mode */
            if (_this.editMode) {
                /** Checking route params to get id of department to edit */
                _this.depId = _this.activatedRoute.snapshot.params['id'];
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_department_department_actions__["l" /* GetToEditDepartmentAttempt */]({ departmentId: _this.depId }));
                _this.updateDep = _this.store.select('afterLogin')
                    .map(function (data) { return data.department.toEdit; })
                    .distinctUntilChanged()
                    .subscribe(function (dep) {
                    if (dep) {
                        //setTimeout(() => {
                        _this.dep.userId = dep.user_id;
                        _this.dep.departmentName = dep.department_name;
                        _this.dep.departmentDetails = dep.department_details;
                        //}, 0)
                    }
                });
            }
        });
    };
    /** Your code to update the model */
    CreateDepartmentComponent.prototype.ngAfterViewChecked = function () {
        this.cdr.detectChanges();
    };
    /** Un-subscribe from all subscription when component destroys */
    CreateDepartmentComponent.prototype.ngOnDestroy = function () {
        this.authSubscription.unsubscribe();
        this.afterLoginSubscription.unsubscribe();
    };
    /** Function call to create a new department */
    CreateDepartmentComponent.prototype.onCreateDep = function (form) {
        if (this.editMode) {
            var data = __assign({}, form.value, { departmentId: this.depId });
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_department_department_actions__["f" /* EditDepartmentAttempt */](__assign({}, data)));
        }
        else {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_department_department_actions__["c" /* AddDepartmentAttempt */](form.value));
        }
    };
    return CreateDepartmentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('form'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"]) === "function" && _a || Object)
], CreateDepartmentComponent.prototype, "form", void 0);
CreateDepartmentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-department',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]) === "function" && _d || Object])
], CreateDepartmentComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=create-department.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/department-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_department_create_department_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_department_list_department_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_department_create_department_component__["a" /* CreateDepartmentComponent */], data: { editMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_department_list_department_component__["a" /* ListDepartmentComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_department_create_department_component__["a" /* CreateDepartmentComponent */], data: { editMode: true } },
    { path: '**', redirectTo: 'list' }
];
var DepartmentRoutingModule = (function () {
    function DepartmentRoutingModule() {
    }
    return DepartmentRoutingModule;
}());
DepartmentRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], DepartmentRoutingModule);

//# sourceMappingURL=department-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/department.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentModule", function() { return DepartmentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_department_create_department_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/create-department/create-department.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_department_list_department_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__department_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/department-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DepartmentModule = (function () {
    function DepartmentModule() {
    }
    return DepartmentModule;
}());
DepartmentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__department_routing_module__["a" /* DepartmentRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_department_create_department_component__["a" /* CreateDepartmentComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_department_list_department_component__["a" /* ListDepartmentComponent */]
        ]
    })
], DepartmentModule);

//# sourceMappingURL=department.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n        <h1>Department Section</h1>\n        <ol class=\"breadcrumb\">\n            <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n            <li><a href=\"#\">Tables</a></li>\n            <li class=\"active\">Data tables</li>\n        </ol>\n    </section>\n    <section class=\"content\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box box-primary\">\n                    <div class=\"box-header with-border\">\n                        <h3 class=\"box-title\">List of all Departments</h3>\n                    </div>\n                    <!-- /.box-header -->\n                    <div class=\"box-body\">\n                        <div id=\"example2_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-6\"></div>\n                                <div class=\"col-sm-6\"></div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <table id=\"example2\" class=\"table table-bordered table-hover dataTable\" role=\"grid\" aria-describedby=\"example2_info\">\n                                        <thead>\n                                        <tr role=\"row\">\n                                            <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >#</th>\n                                            <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Department Name</th>\n                                            <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Department Description</th>\n                                            <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Actions</th>\n                                        </tr>\n                                        </thead>\n                                        <tbody>\n                                        <tr role=\"row\" class=\"odd\" *ngFor=\"let item of (afterLoginState | async).department.list; let i = index\">\n                                            <td>{{i+1}}</td>\n                                            <td>{{item.department_name}}</td>\n                                            <td>{{item.department_details}}</td>\n                                            <td>\n                                                <!--<button type=\"button\" class=\"btn btn-primary btn-xs\">-->\n                                                    <!--<i class=\"fa fa-search\" aria-hidden=\"true\"></i>-->\n                                                     <!--View-->\n                                                <!--</button>-->\n                                                <button type=\"button\" class=\"btn btn-warning btn-xs\" (click)=\"onEdit(item.id)\">\n                                                    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                                                     Edit\n                                                </button>\n                                                <!--<button type=\"button\" class=\"btn btn-danger btn-xs\">-->\n                                                    <!--<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>-->\n                                                     <!--Delete-->\n                                                <!--</button>-->\n                                            </td>\n                                        </tr>\n                                        </tbody>\n                                        <tfoot>\n                                        <tr>\n                                            <th rowspan=\"1\" colspan=\"1\">#</th>\n                                            <th rowspan=\"1\" colspan=\"1\">Department Name</th>\n                                            <th rowspan=\"1\" colspan=\"1\">Department Description</th>\n                                            <th rowspan=\"1\" colspan=\"1\">Actions</th>\n                                        </tr>\n                                        </tfoot>\n                                    </table>\n                                </div>\n                            </div>\n                            <!-- Pagination -->\n                            <div class=\"row\">\n                                <div class=\"col-sm-5\">\n                                    <div class=\"dataTables_info\" id=\"example2_info\" role=\"status\" aria-live=\"polite\">Showing 1 to 10 of 57 entries</div>\n                                </div>\n                                <div class=\"col-sm-7 text-right\">\n                                    <div class=\"dataTables_paginate paging_simple_numbers\" id=\"example2_paginate\">\n                                        <ul class=\"pagination\">\n                                            <li class=\"paginate_button previous disabled\" id=\"example2_previous\">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"0\" tabindex=\"0\">Previous</a>\n                                            </li>\n                                            <li class=\"paginate_button active\">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"1\" tabindex=\"0\">1</a>\n                                            </li>\n                                            <li class=\"paginate_button \">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"2\" tabindex=\"0\">2</a>\n                                            </li>\n                                            <li class=\"paginate_button \">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"3\" tabindex=\"0\">3</a>\n                                            </li>\n                                            <li class=\"paginate_button \">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"4\" tabindex=\"0\">4</a>\n                                            </li>\n                                            <li class=\"paginate_button \">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"5\" tabindex=\"0\">5</a>\n                                            </li>\n                                            <li class=\"paginate_button \">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"6\" tabindex=\"0\">6</a>\n                                            </li>\n                                            <li class=\"paginate_button next\" id=\"example2_next\">\n                                                <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"7\" tabindex=\"0\">Next</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- /.box-body -->\n                </div>\n                <!-- /.box -->\n            </div>\n            <!-- /.col -->\n        </div>\n        <!-- /.row -->\n    </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListDepartmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_department_department_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/department/department.actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListDepartmentComponent = (function () {
    function ListDepartmentComponent(store, router) {
        this.store = store;
        this.router = router;
    }
    /** Function to be executed when component initializes */
    ListDepartmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authSubscription = this.store.select('auth')
            .subscribe(function (data) {
            if (data.isAdmin) {
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_2__store_department_department_actions__["k" /* GetDepartmentListAttempt */]({ userId: data.userId }));
            }
            else {
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_2__store_department_department_actions__["k" /* GetDepartmentListAttempt */]({}));
            }
        });
        this.afterLoginState = this.store.select('afterLogin');
    };
    /** Function call to start editing a department */
    ListDepartmentComponent.prototype.onEdit = function (depId) {
        this.router.navigate(['department/edit/', depId]);
    };
    ListDepartmentComponent.prototype.ngOnDestroy = function () {
        this.authSubscription.unsubscribe();
    };
    return ListDepartmentComponent;
}());
ListDepartmentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-department',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/department/list-department/list-department.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _b || Object])
], ListDepartmentComponent);

var _a, _b;
//# sourceMappingURL=list-department.component.js.map

/***/ })

});
//# sourceMappingURL=department.module.chunk.js.map