webpackJsonp(["agent.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/agent/agent-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgentRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_agent_create_agent_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_agent_list_agent_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_agent_create_agent_component__["a" /* CreateAgentComponent */], data: { editMode: false } },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_agent_list_agent_component__["a" /* ListAgentComponent */] },
    { path: 'edit/:id', component: __WEBPACK_IMPORTED_MODULE_2__create_agent_create_agent_component__["a" /* CreateAgentComponent */], data: { editMode: true } },
    { path: '**', redirectTo: 'list' }
];
var AgentRoutingModule = (function () {
    function AgentRoutingModule() {
    }
    return AgentRoutingModule;
}());
AgentRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AgentRoutingModule);

//# sourceMappingURL=agent-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/agent.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgentModule", function() { return AgentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_text_mask__ = __webpack_require__("../../../../angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_text_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agent_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/agent-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__create_agent_create_agent_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__list_agent_list_agent_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__ = __webpack_require__("../../../../../src/app/core/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_search_filter__ = __webpack_require__("../../../../ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_order_pipe__ = __webpack_require__("../../../../ngx-order-pipe/ngx-order-pipe.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_pagination__ = __webpack_require__("../../../../ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AgentModule = (function () {
    function AgentModule() {
    }
    return AgentModule;
}());
AgentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__agent_routing_module__["a" /* AgentRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3_angular2_text_mask__["TextMaskModule"],
            __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_search_filter__["a" /* Ng2SearchPipeModule */],
            __WEBPACK_IMPORTED_MODULE_9_ngx_order_pipe__["a" /* OrderModule */],
            __WEBPACK_IMPORTED_MODULE_10_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__["b" /* ModalModule */].forRoot(),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__create_agent_create_agent_component__["a" /* CreateAgentComponent */],
            __WEBPACK_IMPORTED_MODULE_6__list_agent_list_agent_component__["a" /* ListAgentComponent */]
        ]
    })
], AgentModule);

//# sourceMappingURL=agent.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-disabled {\n    opacity: .4;\n    cursor: not-allowed;\n    pointer-events: none;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Agent Section</h1>\n    <ol class=\"breadcrumb\">\n      <li><a routerLink=\"/dashboard\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a routerLink=\"/agent/list\">Agent</a></li>\n      <li class=\"active\"><a href=\"javascript:void(0)\">{{editMode ? 'Edit' : 'Create'}}</a></li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <!-- /.box-header -->\n          <div class=\"box-body\" *ngIf=\"(authState | async).twilioIsActive\">\n            <form #form=\"ngForm\" (submit)=\"onSubmit(form)\">\n              <!-- text input -->\n              <div class=\"box-header with-border\">\n                <h3 class=\"box-title\">{{ editMode ? 'Edit': 'Create' }} Agent</h3>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label class=\"control-label\" for=\"admin\">\n                        Admin for Agent\n                      </label>\n                      <select\n                              id=\"admin\"\n                              name=\"parentId\"\n                              [ngClass]=\"editMode || (authState | async).isAdmin ?  'btn-disabled form-control' : 'form-control' \"\n                              #selectedAdmin\n                              [ngModel]=\"agent.parentId\"\n                              (change)=\"adminChanged(selectedAdmin.value)\"\n                              required\n                      >\n                        <option selected value=\"0\">Choose...</option>\n                        <option [value]=\"item.id\"\n                                *ngFor=\"let item of (afterLoginState | async).admin.list; let i = index\"\n                        >\n                          {{item.first_name}} {{item.last_name}}\n                        </option>\n                      </select>\n\n                    </div>\n                </div>\n\n                <div class=\"col-md-6\" *ngIf=\"selectedAdmin.value > 0\">\n\n                    <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"department\">\n                      Department for Agent\n                    </label>\n                    <select class=\"form-control\"\n                            id=\"department\"\n                            name=\"departmentId\"\n                            [disabled]=\"editMode\"\n                            #selectedDepartment\n                            [ngModel]=\"agent.departmentId\"\n                            (change)=\"deptChanged(selectedDepartment.value)\"\n                            required\n                    >\n                      <option selected value=\"0\">Choose...</option>\n                        <option [value]=\"item.id\" *ngFor=\"let item of (afterLoginState | async).department.list; let i = index\">\n                        {{item.department_name}}\n                      </option>\n                        <option value=\"99999991999999\" style=\"font-weight: bold;\">&#43; Create Department </option>\n                    </select>\n                  </div>\n                    <div class=\"hide\">\n                        <a class=\"btn btn-warning btn-md\" style=\"margin-top: 25px;\" type=\"button\" (click)=\"createDepartment(template)\" id=\"createDepartment\"> Create Department</a>\n                    </div>\n                </div>\n\n              </div>\n\n              <div class=\"row\" *ngIf=\"selectDept\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(firstName.invalid && firstName.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"firstName\">First Name\n                      <i *ngIf=\"firstName.invalid && firstName.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"firstName\"\n                           name=\"firstName\"\n                           [ngModel]=\"agent.firstName\"\n                           #firstName=\"ngModel\"\n                           required\n                           placeholder=\"First Name\"\n                    >\n                    <span *ngIf=\"firstName.invalid && firstName.touched\" class=\"help-block\">Your First Name is Required !</span>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(lastName.invalid && lastName.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"lastName\">Last Name\n                      <i *ngIf=\"lastName.invalid && lastName.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"lastName\"\n                           name=\"lastName\"\n                           [ngModel]=\"agent.lastName\"\n                           #lastName=\"ngModel\"\n                           required\n                           placeholder=\"Last Name\"\n                    >\n                    <span *ngIf=\"lastName.invalid && lastName.touched\" class=\"help-block\">Your Last Name is Required !</span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" *ngIf=\"selectDept\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(email.invalid && email.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"email\">Email\n                      <i *ngIf=\"email.invalid && email.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"email\"\n                           class=\"form-control\"\n                           id=\"email\"\n                           name=\"email\"\n                           [ngModel]=\"agent.email\"\n                           #email=\"ngModel\"\n                           email\n                           required\n                           [disabled]=\"editMode\"\n                           placeholder=\"email\"\n                    >\n                    <span *ngIf=\"email.invalid && email.touched && form.controls.email?.errors.email\" class=\"help-block\">Please Enter a Proper Email Address!</span>\n                    <span *ngIf=\"email.invalid && email.touched && form.controls.email?.errors.required\" class=\"help-block\">Your Email Address is Required!</span>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <!--<div class=\"form-group\" [ngClass]=\"(userName.invalid && userName.touched) ? 'has-error': ''\">-->\n                    <!--<label class=\"control-label\" for=\"userName\">Username-->\n                      <!--<i *ngIf=\"userName.invalid && userName.touched\" class=\"fa fa-times-circle-o\"></i>-->\n                    <!--</label>-->\n                    <!--<input type=\"text\"-->\n                           <!--class=\"form-control\"-->\n                           <!--id=\"userName\"-->\n                           <!--placeholder=\"Username\"-->\n                           <!--[ngModel]=\"agent.userName\"-->\n                           <!--name=\"userName\"-->\n                           <!--required-->\n                           <!--ngModel-->\n                           <!--#userName=\"ngModel\"-->\n                    <!--&gt;-->\n                    <!--<span *ngIf=\"userName.invalid && userName.touched\" class=\"help-block\">Your Username is Required !</span>-->\n                  <!--</div>-->\n                </div>\n              </div>\n\n              <div class=\"row\" *ngIf=\"selectDept\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(phone.invalid && phone.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"phone\">Phone\n                      <i *ngIf=\"phone.invalid && phone.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           [textMask]=\"{mask: mask, guide: false}\"\n                           id=\"phone\"\n                           placeholder=\"phone\"\n                           [ngModel]=\"agent.phone\"\n                           name=\"phone\"\n                           required\n                           ngModel\n                           #phone=\"ngModel\"\n                    >\n                    <span *ngIf=\"phone.invalid && phone.touched\" class=\"help-block\">Your Phone Number is Required !</span>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n\n                </div>\n              </div>\n\n              <div class=\"col-md-12\">\n                <div class=\"box-footer\">\n                  <button type=\"submit\" [disabled]=\"form.invalid || !selectDept\" class=\"btn btn-primary pull-right\" ><i *ngIf=\"loader\" class=\"fa fa-spinner fa-spin\"></i> Submit</button>\n                </div>\n              </div>\n            </form>\n          </div>\n          <div class=\"box-body\" *ngIf=\"!(authState | async).twilioIsActive\">\n            <h4>Twilio Credentials Not Added by SuperAdmin :-(</h4>\n          </div>\n          <!-- /.box-body -->\n        </div>\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n      <ng-template #template>\n          <div class=\"modal-header\">\n              <h4 class=\"modal-title pull-left\">Create Department </h4>\n              <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n                  <span aria-hidden=\"true\">&times;</span>\n              </button>\n          </div>\n          <div class=\"modal-body row\">\n              <form #form=\"ngForm\" (submit)=\"onCreateDep(form)\">\n                  <input type=\"hidden\"\n                         id=\"userId\"\n                         name=\"userId\"\n                         [ngModel]=\"dep.userId\"\n                         #userId=\"ngModel\">\n              <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(dName.invalid && dName.touched) ? 'has-error': ''\">\n                      <label class=\"control-label\" for=\"name\">\n                          <i *ngIf=\"dName.invalid && dName.touched\" class=\"fa fa-times-circle-o\"></i>\n                          Department Name\n                      </label>\n                      <input type=\"text\"\n                             class=\"form-control\"\n                             id=\"name\"\n                             name=\"departmentName\"\n                             [ngModel]=\"dep.departmentName\"\n                             #dName=\"ngModel\"\n                             required\n                             placeholder=\"Enter ...\"\n                      >\n                      <span *ngIf=\"dName.invalid && dName.touched\" class=\"help-block\">Your Department Name is Required!</span>\n                  </div>\n              </div>\n                  <div class=\"col-md-6\">\n                      <div class=\"form-group\" [ngClass]=\"{ 'has-error': dDes.invalid && dDes.touched }\">\n                          <label class=\"control-label\" for=\"detail\">\n                              <i *ngIf=\"dDes.invalid && dDes.touched\" class=\"fa fa-times-circle-o\"></i>\n                              Department Description\n                          </label>\n                          <input type=\"text\"\n                                 class=\"form-control\"\n                                 id=\"detail\"\n                                 name=\"departmentDetails\"\n                                 ngModel\n                                 [ngModel]=\"dep.departmentDetails\"\n                                 #dDes=\"ngModel\"\n                                 required\n                                 placeholder=\"Enter ...\"\n                          >\n                          <span *ngIf=\"dDes.invalid && dDes.touched\" class=\"help-block\">Your Department Description is Required!</span>\n                      </div>\n                  </div>\n                  <div class=\"col-md-12\">\n                      <button type=\"submit\"\n                              [disabled]=\"form.invalid\"\n                              class=\"btn btn-primary pull-right\"\n                      >\n                          <i *ngIf=\"loader\" class=\"fa fa-spinner fa-spin\"></i> Submit\n                      </button>\n                  </div>\n              </form>\n          </div>\n      </ng-template>\n  </section>\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAgentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_admin_admin_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/admin/admin.actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/agent/agent.actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store_department_department_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/department/department.actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
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









var CreateAgentComponent = (function () {
    /** Service injection */
    function CreateAgentComponent(store, activatedRoute, cdr, router, modalService) {
        this.store = store;
        this.activatedRoute = activatedRoute;
        this.cdr = cdr;
        this.router = router;
        this.modalService = modalService;
        this.editMode = false;
        this.selectAdmin = false;
        this.selectDept = false;
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.agent = {
            userId: 0,
            parentId: 0,
            departmentId: 0,
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            phone: ''
        };
        this.loader = false;
    }
    /** Function to be executed when component initializes */
    CreateAgentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_5__store_admin_admin_actions__["q" /* GetAdminListAttempt */]());
        this.authState = this.store.select('auth');
        this.afterLoginState = this.store.select('afterLogin');
        this.authSubscription = this.store.select('auth')
            .subscribe(function (data) {
            if (data.isAdmin) {
                _this.agent.parentId = data.userId;
                _this.loggedInAdminId = data.userId;
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_7__store_department_department_actions__["k" /* GetDepartmentListAttempt */]({ userId: data.userId }));
            }
        });
        this.activatedRoute.data
            .subscribe(function (data) {
            _this.editMode = data['editMode'];
            if (_this.editMode) {
                /** Perform operation is present mode is edit mode */
                _this.selectDept = true;
                _this.userId = _this.activatedRoute.snapshot.params['id'];
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["l" /* GetToEditAgentAttempt */]({ agentId: _this.userId }));
                _this.updateAgent = _this.store.select('afterLogin')
                    .map(function (data) { return data.agent.toEdit; })
                    .distinctUntilChanged()
                    .subscribe(function (agent) {
                    if (agent) {
                        _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_7__store_department_department_actions__["k" /* GetDepartmentListAttempt */]({ userId: agent.parent_id }));
                        _this.agent.parentId = agent.parent_id;
                        _this.agent.firstName = agent.first_name;
                        _this.agent.lastName = agent.last_name;
                        _this.agent.userName = agent.username;
                        _this.agent.email = agent.email;
                        _this.agent.phone = agent.phone;
                        _this.agent.departmentId = agent.department_id;
                    }
                });
                _this.selectAdmin = true;
            }
        });
        this.afterLoginSubscription = this.store.select('afterLogin')
            .map(function (data) { return data.agent.resetAgentForm; })
            .subscribe(function (data) {
            if (data) {
                _this.loader = false;
                _this.form.reset();
                _this.selectDept = false;
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["n" /* ResetAgentForm */]());
                if (!!_this.loggedInAdminId) {
                    _this.form.form.patchValue({ parentId: _this.loggedInAdminId, departmentId: 0 });
                }
            }
        });
        this.dep = {
            userId: '',
            departmentName: '',
            departmentDetails: ''
        };
    };
    CreateAgentComponent.prototype.ngAfterViewChecked = function () {
        this.cdr.detectChanges();
    };
    /** Function call to create or edit a admin */
    CreateAgentComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.loader = true;
        if (this.editMode) {
            var data = __assign({}, form.value, { userId: this.userId });
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["f" /* EditAgentAttempt */](__assign({}, data)));
            /** Loader Show/Hide */
            this.store.select('alert')
                .map(function (data) { return data; })
                .subscribe(function (data) {
                if (data.show && data.type === 'danger') {
                    _this.loader = false;
                }
                else if (data.show && data.type === 'success') {
                    _this.router.navigate(['/agent/list']);
                }
            }, function (error) { console.error(error); _this.loader = false; }, function () { _this.loader = false; });
        }
        else {
            /** Create Agent */
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["c" /* AddAgentAttempt */](form.value));
            /** Loader Show/Hide */
            this.store.select('alert')
                .map(function (data) { return data; })
                .subscribe(function (data) {
                if (data.show && data.type === 'danger') {
                    _this.loader = false;
                }
                else if (data.show && data.type === 'success') {
                    _this.router.navigate(['/agent/list']);
                }
            }, function (error) { console.error(error); _this.loader = false; }, function () { _this.loader = false; });
        }
    };
    /** Un-subscribing from all custom made events when component is destroyed */
    CreateAgentComponent.prototype.ngOnDestroy = function () {
        this.afterLoginSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
    };
    /** Function to fetch department list with respect to adminId/userId */
    CreateAgentComponent.prototype.adminChanged = function (id) {
        if (!!id) {
            this.adminUserId = id;
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_7__store_department_department_actions__["k" /* GetDepartmentListAttempt */]({ userId: id }));
        }
    };
    /** Function to check if valid department is selected */
    CreateAgentComponent.prototype.deptChanged = function (id) {
        this.selectDept = id > 0;
        if (id == '99999991999999') {
            var element = document.getElementById('createDepartment'); /** open modal on click */
            element.click();
        }
    };
    /** Function to create a department from the create agent page */
    CreateAgentComponent.prototype.createDepartment = function (template) {
        this.dep.userId = this.adminUserId;
        this.bsModalRef = this.modalService.show(template);
    };
    /** function to create a department */
    CreateAgentComponent.prototype.onCreateDep = function (form) {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_7__store_department_department_actions__["c" /* AddDepartmentAttempt */](form.value));
        this.bsModalRef.hide();
    };
    return CreateAgentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('form'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"]) === "function" && _a || Object)
], CreateAgentComponent.prototype, "form", void 0);
CreateAgentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-create-agent',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__["a" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__["a" /* BsModalService */]) === "function" && _f || Object])
], CreateAgentComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=create-agent.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Agent List</h1>\n    <ol class=\"breadcrumb\">\n      <li><a routerLink=\"/dashboard\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"javascript:void(0)\">Agent</a></li>\n      <li class=\"active\"><a href=\"javascript:void(0)\">List</a></li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <div class=\"box-header\">\n            <h3 class=\"box-title\">Agent List</h3>\n          </div>\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <div id=\"example2_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap\">\n              <div class=\"row\">\n                <div class=\"col-sm-6\">Search : <input [(ngModel)]=\"term\" placeholder=\"keyword\"></div>\n                <div class=\"col-sm-6\"></div></div><div class=\"row\"><div class=\"col-sm-12\">\n              <table id=\"agentListTable\" class=\"table table-bordered table-hover dataTable\" role=\"grid\" aria-describedby=\"example2_info\">\n              <thead>\n              <tr role=\"row\">\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\">#</th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" class=\"mdl-data-table__cell--non-numeric\">First Name </th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" class=\"mdl-data-table__cell--non-numeric\">Last Name </th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" class=\"mdl-data-table__cell--non-numeric\">Company </th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\">Email </th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"CSS grade: activate to sort column ascending\">Phone</th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" class=\"mdl-data-table__cell--non-numeric\">Register Date </th>\n                <th tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"CSS grade: activate to sort column ascending\">Action</th>\n              </tr>\n              </thead>\n              <tbody>\n              <tr role=\"row\" class=\"odd\" *ngFor=\"let item of (afterLoginState | async).agent.list | filter : term | paginate: { itemsPerPage: 10, currentPage: page }; let i = index\">\n                <td>{{i+1}}</td>\n                <td>{{item.first_name}}</td>\n                <td>{{item.last_name}}</td>\n                <td>{{item.get_company?.company}}</td>\n                <td>{{item.email}}</td>\n                <td>{{item.phone}}</td>\n                <td>{{item.created_at | date}}</td>\n                <td>\n                  <!-- Single button -->\n                  <div class=\"btn-group\" [appDropdown]=\"'open'\" [disable-hover]=\"true\">\n                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                      Action <span class=\"caret\"></span>\n                    </button>\n                    <ul class=\"dropdown-menu\">\n                      <li> <a (click)=\"onEditAgent(item.id)\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>Edit</a> </li>\n                      <li *ngIf=\"item.profile_status == '1'\"> <a (click)=\"blockUser(item.id)\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i>Block</a> </li>\n                      <li *ngIf=\"item.profile_status == '2'\"> <a (click)=\"UnblockUser(item.id)\"><i class=\"fa fa-unlock\" aria-hidden=\"true\"></i>Unblock</a> </li>\n                    </ul>\n                  </div>\n                </td>\n              </tr>\n              </tbody>\n            </table>\n              <div class=\"row\">\n                <pagination-controls class=\"older_post_text\"\n                                     (pageChange)=\"page=$event\"\n                                     maxSize=\"9\"\n                                     directionLinks=\"true\"\n                                     autoHide=\"true\"\n                                     previousLabel=\"\"\n                                     nextLabel=\"\"\n                                     screenReaderPaginationLabel=\"\"\n                                     screenReaderPageLabel=\"page\"\n                                     screenReaderCurrentLabel=\"You're on page\">\n                </pagination-controls>\n              </div>\n            </div>\n            </div>\n            </div>\n          </div>\n          <!-- /.box-body -->\n        </div>\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListAgentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_agent_agent_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/agent/agent.actions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_order_pipe__ = __webpack_require__("../../../../ngx-order-pipe/ngx-order-pipe.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListAgentComponent = (function () {
    /** Service injection */
    function ListAgentComponent(store, router, orderPipe) {
        this.store = store;
        this.router = router;
        this.orderPipe = orderPipe;
        this.order = 'info.name';
        this.reverse = false;
        this.sortedCollection = orderPipe.transform(this.afterLoginState, 'info.name');
    }
    /** Function to be executed when component initializes */
    ListAgentComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_3__store_agent_agent_actions__["k" /* GetAgentListAttempt */]());
        this.page = 1;
        this.afterLoginState = this.store.select('afterLogin');
    };
    /** Function to Edit Agent */
    ListAgentComponent.prototype.onEditAgent = function (id) {
        this.router.navigate(['agent/edit/', id]);
    };
    /**
     * Function for ordering the table
     * @param {string} value
     */
    ListAgentComponent.prototype.setOrder = function (value) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    };
    return ListAgentComponent;
}());
ListAgentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-agent',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_order_pipe__["b" /* OrderPipe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_order_pipe__["b" /* OrderPipe */]) === "function" && _c || Object])
], ListAgentComponent);

var _a, _b, _c;
//# sourceMappingURL=list-agent.component.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/component-loader/component-loader.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_triggers__ = __webpack_require__("../../../../ngx-bootstrap/utils/triggers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_ref_class__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/content-ref.class.js");
// tslint:disable:max-file-line-count
// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?



var ComponentLoader = (function () {
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * @internal
     */
    // tslint:disable-next-line
    function ComponentLoader(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _applicationRef, _posService) {
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._injector = _injector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._applicationRef = _applicationRef;
        this._posService = _posService;
        this.onBeforeShow = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onBeforeHide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._providers = [];
        this._isHiding = false;
        this._listenOpts = {};
        this._globalListener = Function.prototype;
    }
    Object.defineProperty(ComponentLoader.prototype, "isShown", {
        get: function () {
            if (this._isHiding) {
                return false;
            }
            return !!this._componentRef;
        },
        enumerable: true,
        configurable: true
    });
    ComponentLoader.prototype.attach = function (compType) {
        this._componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(compType);
        return this;
    };
    // todo: add behaviour: to target element, `body`, custom element
    ComponentLoader.prototype.to = function (container) {
        this.container = container || this.container;
        return this;
    };
    ComponentLoader.prototype.position = function (opts) {
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = opts.target || this._elementRef;
        return this;
    };
    ComponentLoader.prototype.provide = function (provider) {
        this._providers.push(provider);
        return this;
    };
    // todo: appendChild to element or document.querySelector(this.container)
    ComponentLoader.prototype.show = function (opts) {
        if (opts === void 0) { opts = {}; }
        this._subscribePositioning();
        this._innerComponent = null;
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
            var injector = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolveAndCreate(this._providers, this._injector);
            this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
            this._applicationRef.attachView(this._componentRef.hostView);
            // this._componentRef = this._viewContainerRef
            //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) {
                this.container.nativeElement.appendChild(this._componentRef.location.nativeElement);
            }
            if (this.container === 'body' && typeof document !== 'undefined') {
                document
                    .querySelector(this.container)
                    .appendChild(this._componentRef.location.nativeElement);
            }
            if (!this.container &&
                this._elementRef &&
                this._elementRef.nativeElement.parentElement) {
                this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered
            // via
            // Renderer::listen() are not picked up by change detection with the
            // OnPush strategy
            if (this._contentRef.componentRef) {
                this._innerComponent = this._contentRef.componentRef.instance;
                this._contentRef.componentRef.changeDetectorRef.markForCheck();
                this._contentRef.componentRef.changeDetectorRef.detectChanges();
            }
            this._componentRef.changeDetectorRef.markForCheck();
            this._componentRef.changeDetectorRef.detectChanges();
            this.onShown.emit(this._componentRef.instance);
        }
        this._registerOutsideClick();
        return this._componentRef;
    };
    ComponentLoader.prototype.hide = function () {
        if (!this._componentRef) {
            return this;
        }
        this.onBeforeHide.emit(this._componentRef.instance);
        var componentEl = this._componentRef.location.nativeElement;
        componentEl.parentNode.removeChild(componentEl);
        if (this._contentRef.componentRef) {
            this._contentRef.componentRef.destroy();
        }
        this._componentRef.destroy();
        if (this._viewContainerRef && this._contentRef.viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        }
        if (this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        // this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
        //
        // if (this._contentRef.viewRef && this._viewContainerRef.indexOf(this._contentRef.viewRef) !== -1) {
        //   this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        // }
        this._contentRef = null;
        this._componentRef = null;
        this._removeGlobalListener();
        this.onHidden.emit();
        return this;
    };
    ComponentLoader.prototype.toggle = function () {
        if (this.isShown) {
            this.hide();
            return;
        }
        this.show();
    };
    ComponentLoader.prototype.dispose = function () {
        if (this.isShown) {
            this.hide();
        }
        this._unsubscribePositioning();
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
    };
    ComponentLoader.prototype.listen = function (listenOpts) {
        var _this = this;
        this.triggers = listenOpts.triggers || this.triggers;
        this._listenOpts.outsideClick = listenOpts.outsideClick;
        listenOpts.target = listenOpts.target || this._elementRef.nativeElement;
        var hide = (this._listenOpts.hide = function () {
            return listenOpts.hide ? listenOpts.hide() : void _this.hide();
        });
        var show = (this._listenOpts.show = function (registerHide) {
            listenOpts.show ? listenOpts.show(registerHide) : _this.show(registerHide);
            registerHide();
        });
        var toggle = function (registerHide) {
            _this.isShown ? hide() : show(registerHide);
        };
        this._unregisterListenersFn = Object(__WEBPACK_IMPORTED_MODULE_1__utils_triggers__["a" /* listenToTriggersV2 */])(this._renderer, {
            target: listenOpts.target,
            triggers: listenOpts.triggers,
            show: show,
            hide: hide,
            toggle: toggle
        });
        return this;
    };
    ComponentLoader.prototype._removeGlobalListener = function () {
        if (this._globalListener) {
            this._globalListener();
            this._globalListener = null;
        }
    };
    ComponentLoader.prototype.attachInline = function (vRef, template) {
        this._inlineViewRef = vRef.createEmbeddedView(template);
        return this;
    };
    ComponentLoader.prototype._registerOutsideClick = function () {
        var _this = this;
        if (!this._componentRef || !this._componentRef.location) {
            return;
        }
        // why: should run after first event bubble
        if (this._listenOpts.outsideClick) {
            var target_1 = this._componentRef.location.nativeElement;
            setTimeout(function () {
                _this._globalListener = Object(__WEBPACK_IMPORTED_MODULE_1__utils_triggers__["b" /* registerOutsideClick */])(_this._renderer, {
                    targets: [target_1, _this._elementRef.nativeElement],
                    outsideClick: _this._listenOpts.outsideClick,
                    hide: function () { return _this._listenOpts.hide(); }
                });
            });
        }
    };
    ComponentLoader.prototype.getInnerComponent = function () {
        return this._innerComponent;
    };
    ComponentLoader.prototype._subscribePositioning = function () {
        var _this = this;
        if (this._zoneSubscription || !this.attachment) {
            return;
        }
        this._zoneSubscription = this._ngZone.onStable.subscribe(function () {
            if (!_this._componentRef) {
                return;
            }
            _this._posService.position({
                element: _this._componentRef.location,
                target: _this._elementRef,
                attachment: _this.attachment,
                appendToBody: _this.container === 'body'
            });
        });
    };
    ComponentLoader.prototype._unsubscribePositioning = function () {
        if (!this._zoneSubscription) {
            return;
        }
        this._zoneSubscription.unsubscribe();
        this._zoneSubscription = null;
    };
    ComponentLoader.prototype._getContentRef = function (content, context, initialState) {
        if (!content) {
            return new __WEBPACK_IMPORTED_MODULE_2__content_ref_class__["a" /* ContentRef */]([]);
        }
        if (content instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) {
            if (this._viewContainerRef) {
                var _viewRef = this._viewContainerRef
                    .createEmbeddedView(content, context);
                _viewRef.markForCheck();
                return new __WEBPACK_IMPORTED_MODULE_2__content_ref_class__["a" /* ContentRef */]([_viewRef.rootNodes], _viewRef);
            }
            var viewRef = content.createEmbeddedView({});
            this._applicationRef.attachView(viewRef);
            return new __WEBPACK_IMPORTED_MODULE_2__content_ref_class__["a" /* ContentRef */]([viewRef.rootNodes], viewRef);
        }
        if (typeof content === 'function') {
            var contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
            var modalContentInjector = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolveAndCreate(this._providers.slice(), this._injector);
            var componentRef = contentCmptFactory.create(modalContentInjector);
            Object.assign(componentRef.instance, initialState);
            this._applicationRef.attachView(componentRef.hostView);
            return new __WEBPACK_IMPORTED_MODULE_2__content_ref_class__["a" /* ContentRef */]([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
        return new __WEBPACK_IMPORTED_MODULE_2__content_ref_class__["a" /* ContentRef */]([[this._renderer.createText("" + content)]]);
    };
    return ComponentLoader;
}());

//# sourceMappingURL=component-loader.class.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/component-loader/component-loader.factory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentLoaderFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_loader_class__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/component-loader.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__positioning_index__ = __webpack_require__("../../../../ngx-bootstrap/positioning/index.js");



var ComponentLoaderFactory = (function () {
    function ComponentLoaderFactory(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._posService = _posService;
        this._applicationRef = _applicationRef;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    ComponentLoaderFactory.prototype.createLoader = function (_elementRef, _viewContainerRef, _renderer) {
        return new __WEBPACK_IMPORTED_MODULE_1__component_loader_class__["a" /* ComponentLoader */](_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService);
    };
    ComponentLoaderFactory.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], },
        { type: __WEBPACK_IMPORTED_MODULE_2__positioning_index__["a" /* PositioningService */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], },
    ]; };
    return ComponentLoaderFactory;
}());

//# sourceMappingURL=component-loader.factory.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/component-loader/content-ref.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentRef; });
/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var ContentRef = (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());

//# sourceMappingURL=content-ref.class.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/component-loader/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_loader_class__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/component-loader.class.js");
/* unused harmony reexport ComponentLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_loader_factory__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/component-loader.factory.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__component_loader_factory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_ref_class__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/content-ref.class.js");
/* unused harmony reexport ContentRef */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/bs-modal-ref.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BsModalRef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");

var BsModalRef = (function () {
    function BsModalRef() {
        /**
         * Hides the modal
         */
        this.hide = Function;
    }
    BsModalRef.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BsModalRef.ctorParameters = function () { return []; };
    return BsModalRef;
}());

//# sourceMappingURL=bs-modal-ref.service.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/bs-modal.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BsModalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_loader_component_loader_factory__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/component-loader.factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_backdrop_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-backdrop.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_container_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-container.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bs_modal_ref_service__ = __webpack_require__("../../../../ngx-bootstrap/modal/bs-modal-ref.service.js");






var BsModalService = (function () {
    function BsModalService(rendererFactory, clf) {
        this.clf = clf;
        // constructor props
        this.config = __WEBPACK_IMPORTED_MODULE_4__modal_options_class__["e" /* modalConfigDefaults */];
        this.onShow = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onHide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.modalsCount = 0;
        this.lastDismissReason = '';
        this.loaders = [];
        this._backdropLoader = this.clf.createLoader(null, null, null);
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /** Shows a modal */
    BsModalService.prototype.show = function (content, config) {
        this.modalsCount++;
        this._createLoaders();
        this.config = Object.assign({}, __WEBPACK_IMPORTED_MODULE_4__modal_options_class__["e" /* modalConfigDefaults */], config);
        this._showBackdrop();
        this.lastDismissReason = null;
        return this._showModal(content);
    };
    BsModalService.prototype.hide = function (level) {
        var _this = this;
        if (this.modalsCount === 1) {
            this._hideBackdrop();
            this.resetScrollbar();
        }
        this.modalsCount = this.modalsCount >= 1 ? this.modalsCount - 1 : 0;
        setTimeout(function () {
            _this._hideModal(level);
            _this.removeLoaders(level);
        }, this.config.animated ? __WEBPACK_IMPORTED_MODULE_4__modal_options_class__["d" /* TRANSITION_DURATIONS */].BACKDROP : 0);
    };
    BsModalService.prototype._showBackdrop = function () {
        var isBackdropEnabled = this.config.backdrop || this.config.backdrop === 'static';
        var isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;
        if (this.modalsCount === 1) {
            this.removeBackdrop();
            if (isBackdropEnabled && isBackdropInDOM) {
                this._backdropLoader
                    .attach(__WEBPACK_IMPORTED_MODULE_2__modal_backdrop_component__["a" /* ModalBackdropComponent */])
                    .to('body')
                    .show({ isAnimated: this.config.animated });
                this.backdropRef = this._backdropLoader._componentRef;
            }
        }
    };
    BsModalService.prototype._hideBackdrop = function () {
        var _this = this;
        if (!this.backdropRef) {
            return;
        }
        this.backdropRef.instance.isShown = false;
        var duration = this.config.animated ? __WEBPACK_IMPORTED_MODULE_4__modal_options_class__["d" /* TRANSITION_DURATIONS */].BACKDROP : 0;
        setTimeout(function () { return _this.removeBackdrop(); }, duration);
    };
    BsModalService.prototype._showModal = function (content) {
        var modalLoader = this.loaders[this.loaders.length - 1];
        var bsModalRef = new __WEBPACK_IMPORTED_MODULE_5__bs_modal_ref_service__["a" /* BsModalRef */]();
        var modalContainerRef = modalLoader
            .provide({ provide: __WEBPACK_IMPORTED_MODULE_4__modal_options_class__["c" /* ModalOptions */], useValue: this.config })
            .provide({ provide: __WEBPACK_IMPORTED_MODULE_5__bs_modal_ref_service__["a" /* BsModalRef */], useValue: bsModalRef })
            .attach(__WEBPACK_IMPORTED_MODULE_3__modal_container_component__["a" /* ModalContainerComponent */])
            .to('body')
            .show({ content: content, isAnimated: this.config.animated, initialState: this.config.initialState, bsModalService: this });
        modalContainerRef.instance.level = this.getModalsCount();
        bsModalRef.hide = function () {
            modalContainerRef.instance.hide();
        };
        bsModalRef.content = modalLoader.getInnerComponent() || null;
        return bsModalRef;
    };
    BsModalService.prototype._hideModal = function (level) {
        var modalLoader = this.loaders[level - 1];
        if (modalLoader) {
            modalLoader.hide();
        }
    };
    BsModalService.prototype.getModalsCount = function () {
        return this.modalsCount;
    };
    BsModalService.prototype.setDismissReason = function (reason) {
        this.lastDismissReason = reason;
    };
    BsModalService.prototype.removeBackdrop = function () {
        this._backdropLoader.hide();
        this.backdropRef = null;
    };
    /** AFTER PR MERGE MODAL.COMPONENT WILL BE USING THIS CODE */
    /** Scroll bar tricks */
    /** @internal */
    BsModalService.prototype.checkScrollbar = function () {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    };
    BsModalService.prototype.setScrollbar = function () {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || '0', 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = this.originalBodyPadding +
                this.scrollbarWidth + "px";
        }
    };
    BsModalService.prototype.resetScrollbar = function () {
        document.body.style.paddingRight = this.originalBodyPadding + "px";
    };
    // thx d.walsh
    BsModalService.prototype.getScrollbarWidth = function () {
        var scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, __WEBPACK_IMPORTED_MODULE_4__modal_options_class__["a" /* CLASS_NAME */].SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    };
    BsModalService.prototype._createLoaders = function () {
        var loader = this.clf.createLoader(null, null, null);
        this.copyEvent(loader.onBeforeShow, this.onShow);
        this.copyEvent(loader.onShown, this.onShown);
        this.copyEvent(loader.onBeforeHide, this.onHide);
        this.copyEvent(loader.onHidden, this.onHidden);
        this.loaders.push(loader);
    };
    BsModalService.prototype.removeLoaders = function (level) {
        this.loaders.splice(level - 1, 1);
        this.loaders.forEach(function (loader, i) {
            loader.instance.level = i + 1;
        });
    };
    BsModalService.prototype.copyEvent = function (from, to) {
        var _this = this;
        from.subscribe(function () {
            to.emit(_this.lastDismissReason);
        });
    };
    BsModalService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    BsModalService.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], },
        { type: __WEBPACK_IMPORTED_MODULE_1__component_loader_component_loader_factory__["a" /* ComponentLoaderFactory */], },
    ]; };
    return BsModalService;
}());

//# sourceMappingURL=bs-modal.service.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bs_modal_ref_service__ = __webpack_require__("../../../../ngx-bootstrap/modal/bs-modal-ref.service.js");
/* unused harmony reexport BsModalRef */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_backdrop_options__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-backdrop.options.js");
/* unused harmony reexport ModalBackdropOptions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_container_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-container.component.js");
/* unused harmony reexport ModalContainerComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_backdrop_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-backdrop.component.js");
/* unused harmony reexport ModalBackdropComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* unused harmony reexport ModalOptions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_directive__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal.directive.js");
/* unused harmony reexport ModalDirective */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modal_module__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal.module.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__modal_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bs_modal_service__ = __webpack_require__("../../../../ngx-bootstrap/modal/bs-modal.service.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_7__bs_modal_service__["a"]; });








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/modal-backdrop.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalBackdropComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__ = __webpack_require__("../../../../ngx-bootstrap/utils/theme-provider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils_class__ = __webpack_require__("../../../../ngx-bootstrap/utils/utils.class.js");




/** This component will be added as background layout for modals if enabled */
var ModalBackdropComponent = (function () {
    function ModalBackdropComponent(element, renderer) {
        this._isShown = false;
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(ModalBackdropComponent.prototype, "isAnimated", {
        get: function () {
            return this._isAnimated;
        },
        set: function (value) {
            this._isAnimated = value;
            // this.renderer.setElementClass(this.element.nativeElement, `${ClassName.FADE}`, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalBackdropComponent.prototype, "isShown", {
        get: function () {
            return this._isShown;
        },
        set: function (value) {
            this._isShown = value;
            if (value) {
                this.renderer.addClass(this.element.nativeElement, "" + __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].IN);
            }
            else {
                this.renderer.removeClass(this.element.nativeElement, "" + __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].IN);
            }
            if (!Object(__WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__["a" /* isBs3 */])()) {
                if (value) {
                    this.renderer.addClass(this.element.nativeElement, "" + __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].SHOW);
                }
                else {
                    this.renderer.removeClass(this.element.nativeElement, "" + __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].SHOW);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ModalBackdropComponent.prototype.ngOnInit = function () {
        if (this.isAnimated) {
            this.renderer.addClass(this.element.nativeElement, "" + __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].FADE);
            __WEBPACK_IMPORTED_MODULE_3__utils_utils_class__["a" /* Utils */].reflow(this.element.nativeElement);
        }
        this.isShown = true;
    };
    ModalBackdropComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'bs-modal-backdrop',
                    template: ' ',
                    host: { class: __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].BACKDROP }
                },] },
    ];
    /** @nocollapse */
    ModalBackdropComponent.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], },
    ]; };
    return ModalBackdropComponent;
}());

//# sourceMappingURL=modal-backdrop.component.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/modal-backdrop.options.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ModalBackdropOptions */
var ModalBackdropOptions = (function () {
    function ModalBackdropOptions(options) {
        this.animate = true;
        Object.assign(this, options);
    }
    return ModalBackdropOptions;
}());

//# sourceMappingURL=modal-backdrop.options.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/modal-container.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__ = __webpack_require__("../../../../ngx-bootstrap/utils/theme-provider.js");



var ModalContainerComponent = (function () {
    function ModalContainerComponent(options, _element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.isShown = false;
        this.isModalHiding = false;
        this.config = Object.assign({}, options);
    }
    ModalContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.isAnimated) {
            this._renderer.addClass(this._element.nativeElement, __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].FADE);
        }
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        setTimeout(function () {
            _this.isShown = true;
            _this._renderer.addClass(_this._element.nativeElement, Object(__WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__["a" /* isBs3 */])() ? __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].IN : __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].SHOW);
        }, this.isAnimated ? __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["d" /* TRANSITION_DURATIONS */].BACKDROP : 0);
        if (document && document.body) {
            if (this.bsModalService.getModalsCount() === 1) {
                this.bsModalService.checkScrollbar();
                this.bsModalService.setScrollbar();
            }
            this._renderer.addClass(document.body, __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].OPEN);
        }
        if (this._element.nativeElement) {
            this._element.nativeElement.focus();
        }
    };
    ModalContainerComponent.prototype.onClick = function (event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.bsModalService.setDismissReason(__WEBPACK_IMPORTED_MODULE_1__modal_options_class__["b" /* DISMISS_REASONS */].BACKRDOP);
        this.hide();
    };
    ModalContainerComponent.prototype.onEsc = function (event) {
        if (!this.isShown) {
            return;
        }
        if (event.keyCode === 27) {
            event.preventDefault();
        }
        if (this.config.keyboard &&
            this.level === this.bsModalService.getModalsCount()) {
            this.bsModalService.setDismissReason(__WEBPACK_IMPORTED_MODULE_1__modal_options_class__["b" /* DISMISS_REASONS */].ESC);
            this.hide();
        }
    };
    ModalContainerComponent.prototype.ngOnDestroy = function () {
        if (this.isShown) {
            this.hide();
        }
    };
    ModalContainerComponent.prototype.hide = function () {
        var _this = this;
        if (this.isModalHiding || !this.isShown) {
            return;
        }
        this.isModalHiding = true;
        this._renderer.removeClass(this._element.nativeElement, Object(__WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__["a" /* isBs3 */])() ? __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].IN : __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].SHOW);
        setTimeout(function () {
            _this.isShown = false;
            if (document &&
                document.body &&
                _this.bsModalService.getModalsCount() === 1) {
                _this._renderer.removeClass(document.body, __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["a" /* CLASS_NAME */].OPEN);
            }
            _this.bsModalService.hide(_this.level);
            _this.isModalHiding = false;
        }, this.isAnimated ? __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["d" /* TRANSITION_DURATIONS */].MODAL : 0);
    };
    ModalContainerComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'modal-container',
                    template: "\n    <div [class]=\"'modal-dialog' + (config.class ? ' ' + config.class : '')\" role=\"document\">\n      <div class=\"modal-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                    host: {
                        class: 'modal',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    ModalContainerComponent.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__modal_options_class__["c" /* ModalOptions */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], },
    ]; };
    ModalContainerComponent.propDecorators = {
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['click', ['$event'],] },],
        'onEsc': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['window:keydown.esc', ['$event'],] },],
    };
    return ModalContainerComponent;
}());

//# sourceMappingURL=modal-container.component.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/modal-options.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ModalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return modalConfigDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLASS_NAME; });
/* unused harmony export SELECTOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TRANSITION_DURATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DISMISS_REASONS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");

var ModalOptions = (function () {
    function ModalOptions() {
    }
    ModalOptions.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    ModalOptions.ctorParameters = function () { return []; };
    return ModalOptions;
}());

var modalConfigDefaults = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    animated: true,
    initialState: {}
};
var CLASS_NAME = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in',
    SHOW: 'show' // bs4
};
var SELECTOR = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
};
var TRANSITION_DURATIONS = {
    MODAL: 300,
    BACKDROP: 150
};
var DISMISS_REASONS = {
    BACKRDOP: 'backdrop-click',
    ESC: 'esc'
};
//# sourceMappingURL=modal-options.class.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/modal.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__ = __webpack_require__("../../../../ngx-bootstrap/utils/facade/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__ = __webpack_require__("../../../../ngx-bootstrap/utils/theme-provider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils_class__ = __webpack_require__("../../../../ngx-bootstrap/utils/utils.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_backdrop_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-backdrop.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_loader_component_loader_factory__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/component-loader.factory.js");
/* tslint:disable:max-file-line-count */
// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events







var TRANSITION_DURATION = 300;
var BACKDROP_TRANSITION_DURATION = 150;
/** Mark any code with directive to show it's content in modal */
var ModalDirective = (function () {
    function ModalDirective(_element, _viewContainerRef, _renderer, clf) {
        this._element = _element;
        this._renderer = _renderer;
        /** This event fires immediately when the `show` instance method is called. */
        this.onShow = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** This event is fired when the modal has been made visible to the user
         * (will wait for CSS transitions to complete)
         */
        this.onShown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** This event is fired immediately when
         * the hide instance method has been called.
         */
        this.onHide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /** This event is fired when the modal has finished being
         * hidden from the user (will wait for CSS transitions to complete).
         */
        this.onHidden = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._isShown = false;
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.timerHideModal = 0;
        this.timerRmBackDrop = 0;
        this.isNested = false;
        this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
    }
    Object.defineProperty(ModalDirective.prototype, "config", {
        get: function () {
            return this._config;
        },
        /** allows to set modal configuration via element property */
        set: function (conf) {
            this._config = this.getConfig(conf);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDirective.prototype, "isShown", {
        get: function () {
            return this._isShown;
        },
        enumerable: true,
        configurable: true
    });
    ModalDirective.prototype.onClick = function (event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.dismissReason = __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["b" /* DISMISS_REASONS */].BACKRDOP;
        this.hide(event);
    };
    // todo: consider preventing default and stopping propagation
    ModalDirective.prototype.onEsc = function (event) {
        if (!this._isShown) {
            return;
        }
        if (event.keyCode === 27) {
            event.preventDefault();
        }
        if (this.config.keyboard) {
            this.dismissReason = __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["b" /* DISMISS_REASONS */].ESC;
            this.hide();
        }
    };
    ModalDirective.prototype.ngOnDestroy = function () {
        this.config = void 0;
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    };
    ModalDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._config = this._config || this.getConfig();
        setTimeout(function () {
            if (_this._config.show) {
                _this.show();
            }
        }, 0);
    };
    /* Public methods */
    /** Allows to manually toggle modal visibility */
    ModalDirective.prototype.toggle = function () {
        return this._isShown ? this.hide() : this.show();
    };
    /** Allows to manually open modal */
    ModalDirective.prototype.show = function () {
        var _this = this;
        this.dismissReason = null;
        this.onShow.emit(this);
        if (this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        if (__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */] && __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body) {
            if (__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body.classList.contains(__WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].OPEN)) {
                this.isNested = true;
            }
            else {
                this._renderer.addClass(__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].OPEN);
            }
        }
        this.showBackdrop(function () {
            _this.showElement();
        });
    };
    /** Allows to manually close modal */
    ModalDirective.prototype.hide = function (event) {
        var _this = this;
        if (event) {
            event.preventDefault();
        }
        this.onHide.emit(this);
        // todo: add an option to prevent hiding
        if (!this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = false;
        this._renderer.removeClass(this._element.nativeElement, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].IN);
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__["a" /* isBs3 */])()) {
            this._renderer.removeClass(this._element.nativeElement, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].SHOW);
        }
        // this._addClassIn = false;
        if (this._config.animated) {
            this.timerHideModal = setTimeout(function () { return _this.hideModal(); }, TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    };
    /** Private methods @internal */
    ModalDirective.prototype.getConfig = function (config) {
        return Object.assign({}, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["e" /* modalConfigDefaults */], config);
    };
    /**
     *  Show dialog
     *  @internal
     */
    ModalDirective.prototype.showElement = function () {
        var _this = this;
        // todo: replace this with component loader usage
        if (!this._element.nativeElement.parentNode ||
            this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // don't move modals dom position
            if (__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */] && __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body) {
                __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body.appendChild(this._element.nativeElement);
            }
        }
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'false');
        this._renderer.setAttribute(this._element.nativeElement, 'aria-modal', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        this._renderer.setProperty(this._element.nativeElement, 'scrollTop', 0);
        if (this._config.animated) {
            __WEBPACK_IMPORTED_MODULE_3__utils_utils_class__["a" /* Utils */].reflow(this._element.nativeElement);
        }
        // this._addClassIn = true;
        this._renderer.addClass(this._element.nativeElement, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].IN);
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__utils_theme_provider__["a" /* isBs3 */])()) {
            this._renderer.addClass(this._element.nativeElement, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].SHOW);
        }
        var transitionComplete = function () {
            if (_this._config.focus) {
                _this._element.nativeElement.focus();
            }
            _this.onShown.emit(_this);
        };
        if (this._config.animated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    };
    /** @internal */
    ModalDirective.prototype.hideModal = function () {
        var _this = this;
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop(function () {
            if (!_this.isNested) {
                if (__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */] && __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body) {
                    _this._renderer.removeClass(__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].OPEN);
                }
                _this.resetScrollbar();
            }
            _this.resetAdjustments();
            _this.focusOtherModal();
            _this.onHidden.emit(_this);
        });
    };
    // todo: original show was calling a callback when done, but we can use
    // promise
    /** @internal */
    ModalDirective.prototype.showBackdrop = function (callback) {
        var _this = this;
        if (this._isShown &&
            this.config.backdrop &&
            (!this.backdrop || !this.backdrop.instance.isShown)) {
            this.removeBackdrop();
            this._backdrop
                .attach(__WEBPACK_IMPORTED_MODULE_4__modal_backdrop_component__["a" /* ModalBackdropComponent */])
                .to('body')
                .show({ isAnimated: this._config.animated });
            this.backdrop = this._backdrop._componentRef;
            if (!callback) {
                return;
            }
            if (!this._config.animated) {
                callback();
                return;
            }
            setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        }
        else if (!this._isShown && this.backdrop) {
            this.backdrop.instance.isShown = false;
            var callbackRemove = function () {
                _this.removeBackdrop();
                if (callback) {
                    callback();
                }
            };
            if (this.backdrop.instance.isAnimated) {
                this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
            }
            else {
                callbackRemove();
            }
        }
        else if (callback) {
            callback();
        }
    };
    /** @internal */
    ModalDirective.prototype.removeBackdrop = function () {
        this._backdrop.hide();
    };
    /** Events tricks */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    ModalDirective.prototype.focusOtherModal = function () {
        if (this._element.nativeElement.parentElement == null)
            return;
        var otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
        if (!otherOpenedModals.length) {
            return;
        }
        otherOpenedModals[otherOpenedModals.length - 1].focus();
    };
    /** @internal */
    ModalDirective.prototype.resetAdjustments = function () {
        this._renderer.setStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setStyle(this._element.nativeElement, 'paddingRight', '');
    };
    /** Scroll bar tricks */
    /** @internal */
    ModalDirective.prototype.checkScrollbar = function () {
        this.isBodyOverflowing = __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body.clientWidth < __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["b" /* window */].innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    };
    ModalDirective.prototype.setScrollbar = function () {
        if (!__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */]) {
            return;
        }
        this.originalBodyPadding = parseInt(__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["b" /* window */]
            .getComputedStyle(__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body)
            .getPropertyValue('padding-right') || 0, 10);
        if (this.isBodyOverflowing) {
            __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body.style.paddingRight = this.originalBodyPadding +
                this.scrollbarWidth + "px";
        }
    };
    ModalDirective.prototype.resetScrollbar = function () {
        __WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body.style.paddingRight = this.originalBodyPadding + 'px';
    };
    // thx d.walsh
    ModalDirective.prototype.getScrollbarWidth = function () {
        var scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, __WEBPACK_IMPORTED_MODULE_5__modal_options_class__["a" /* CLASS_NAME */].SCROLLBAR_MEASURER);
        this._renderer.appendChild(__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body, scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(__WEBPACK_IMPORTED_MODULE_1__utils_facade_browser__["a" /* document */].body, scrollDiv);
        return scrollbarWidth;
    };
    ModalDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[bsModal]',
                    exportAs: 'bs-modal'
                },] },
    ];
    /** @nocollapse */
    ModalDirective.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"], },
        { type: __WEBPACK_IMPORTED_MODULE_6__component_loader_component_loader_factory__["a" /* ComponentLoaderFactory */], },
    ]; };
    ModalDirective.propDecorators = {
        'config': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'onShow': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'onShown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'onHide': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'onHidden': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['click', ['$event'],] },],
        'onEsc': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['keydown.esc', ['$event'],] },],
    };
    return ModalDirective;
}());

//# sourceMappingURL=modal.directive.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/modal/modal.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_backdrop_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-backdrop.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_directive__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal.directive.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__positioning_index__ = __webpack_require__("../../../../ngx-bootstrap/positioning/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_loader_index__ = __webpack_require__("../../../../ngx-bootstrap/component-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modal_container_component__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-container.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bs_modal_service__ = __webpack_require__("../../../../ngx-bootstrap/modal/bs-modal.service.js");







var ModalModule = (function () {
    function ModalModule() {
    }
    ModalModule.forRoot = function () {
        return {
            ngModule: ModalModule,
            providers: [__WEBPACK_IMPORTED_MODULE_6__bs_modal_service__["a" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_4__component_loader_index__["a" /* ComponentLoaderFactory */], __WEBPACK_IMPORTED_MODULE_3__positioning_index__["a" /* PositioningService */]]
        };
    };
    ModalModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_1__modal_backdrop_component__["a" /* ModalBackdropComponent */],
                        __WEBPACK_IMPORTED_MODULE_2__modal_directive__["a" /* ModalDirective */],
                        __WEBPACK_IMPORTED_MODULE_5__modal_container_component__["a" /* ModalContainerComponent */]
                    ],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__modal_backdrop_component__["a" /* ModalBackdropComponent */], __WEBPACK_IMPORTED_MODULE_2__modal_directive__["a" /* ModalDirective */]],
                    entryComponents: [__WEBPACK_IMPORTED_MODULE_1__modal_backdrop_component__["a" /* ModalBackdropComponent */], __WEBPACK_IMPORTED_MODULE_5__modal_container_component__["a" /* ModalContainerComponent */]]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = function () { return []; };
    return ModalModule;
}());

//# sourceMappingURL=modal.module.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/positioning/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ng_positioning__ = __webpack_require__("../../../../ngx-bootstrap/positioning/ng-positioning.js");
/* unused harmony reexport positionElements */
/* unused harmony reexport Positioning */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__positioning_service__ = __webpack_require__("../../../../ngx-bootstrap/positioning/positioning.service.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__positioning_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/positioning/ng-positioning.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Positioning */
/* harmony export (immutable) */ __webpack_exports__["a"] = positionElements;
/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
var Positioning = (function () {
    function Positioning() {
    }
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
        var parentOffset = {
            width: 0,
            height: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        if (this.getStyle(element, 'position') === 'fixed') {
            var bcRect = element.getBoundingClientRect();
            elPosition = {
                width: bcRect.width,
                height: bcRect.height,
                top: bcRect.top,
                bottom: bcRect.bottom,
                left: bcRect.left,
                right: bcRect.right
            };
        }
        else {
            var offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    };
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        var elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    };
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var hostElPosition = appendToBody
            ? this.offset(hostElement, false)
            : this.position(hostElement, false);
        var targetElStyles = this.getAllStyles(targetElement);
        var shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left +
                hostElPosition.width / 2 -
                targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        var shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top +
                hostElPosition.height / 2 -
                targetElement.offsetHeight / 2,
            bottom: hostElPosition.top + hostElPosition.height
        };
        var targetElBCR = targetElement.getBoundingClientRect();
        var placementPrimary = placement.split(' ')[0] || 'top';
        var placementSecondary = placement.split(' ')[1] || 'center';
        var targetElPosition = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: 0,
            bottom: targetElBCR.height || targetElement.offsetHeight,
            left: 0,
            right: targetElBCR.width || targetElement.offsetWidth
        };
        if (placementPrimary === 'auto') {
            var newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement, placementSecondary);
            if (!newPlacementPrimary)
                newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement);
            if (newPlacementPrimary)
                placementPrimary = newPlacementPrimary;
            targetElement.classList.add(placementPrimary);
        }
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top =
                    hostElPosition.top -
                        (targetElement.offsetHeight +
                            parseFloat(targetElStyles.marginBottom));
                targetElPosition.bottom +=
                    hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'bottom':
                targetElPosition.top = shiftHeight[placementPrimary];
                targetElPosition.bottom += shiftHeight[placementPrimary];
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'left':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left =
                    hostElPosition.left -
                        (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                targetElPosition.right +=
                    hostElPosition.left - targetElement.offsetWidth;
                break;
            case 'right':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = shiftWidth[placementPrimary];
                targetElPosition.right += shiftWidth[placementPrimary];
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    };
    Positioning.prototype.autoPosition = function (targetElPosition, hostElPosition, targetElement, preferredPosition) {
        if ((!preferredPosition || preferredPosition === 'right') &&
            targetElPosition.left + hostElPosition.left - targetElement.offsetWidth <
                0) {
            return 'right';
        }
        else if ((!preferredPosition || preferredPosition === 'top') &&
            targetElPosition.bottom +
                hostElPosition.bottom +
                targetElement.offsetHeight >
                window.innerHeight) {
            return 'top';
        }
        else if ((!preferredPosition || preferredPosition === 'bottom') &&
            targetElPosition.top + hostElPosition.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        else if ((!preferredPosition || preferredPosition === 'left') &&
            targetElPosition.right +
                hostElPosition.right +
                targetElement.offsetWidth >
                window.innerWidth) {
            return 'left';
        }
        return null;
    };
    Positioning.prototype.getAllStyles = function (element) {
        return window.getComputedStyle(element);
    };
    Positioning.prototype.getStyle = function (element, prop) {
        return this.getAllStyles(element)[prop];
    };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl &&
            offsetParentEl !== document.documentElement &&
            this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    };
    return Positioning;
}());

var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody) {
    var pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = pos.top + "px";
    targetElement.style.left = pos.left + "px";
}
//# sourceMappingURL=ng-positioning.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/positioning/positioning.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PositioningService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_positioning__ = __webpack_require__("../../../../ngx-bootstrap/positioning/ng-positioning.js");


var PositioningService = (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        Object(__WEBPACK_IMPORTED_MODULE_1__ng_positioning__["a" /* positionElements */])(_getHtmlElement(target), _getHtmlElement(element), attachment, appendToBody);
    };
    PositioningService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return []; };
    return PositioningService;
}());

function _getHtmlElement(element) {
    // it means that we got a selector
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    if (element instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) {
        return element.nativeElement;
    }
    return element;
}
//# sourceMappingURL=positioning.service.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/utils/facade/browser.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return win; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return document; });
/* unused harmony export location */
/* unused harmony export gc */
/* unused harmony export performance */
/* unused harmony export Event */
/* unused harmony export MouseEvent */
/* unused harmony export KeyboardEvent */
/* unused harmony export EventTarget */
/* unused harmony export History */
/* unused harmony export Location */
/* unused harmony export EventListener */
/*tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = (typeof window !== 'undefined' && window) || {};

var document = win.document;
var location = win.location;
var gc = win['gc'] ? function () { return win['gc'](); } : function () { return null; };
var performance = win['performance'] ? win['performance'] : null;
var Event = win['Event'];
var MouseEvent = win['MouseEvent'];
var KeyboardEvent = win['KeyboardEvent'];
var EventTarget = win['EventTarget'];
var History = win['History'];
var Location = win['Location'];
var EventListener = win['EventListener'];
//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/utils/theme-provider.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setTheme */
/* harmony export (immutable) */ __webpack_exports__["a"] = isBs3;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_browser__ = __webpack_require__("../../../../ngx-bootstrap/utils/facade/browser.js");

var guessedVersion;
function _guessBsVersion() {
    if (typeof document === 'undefined') {
        return null;
    }
    var spanEl = document.createElement('span');
    spanEl.innerText = 'test bs version';
    document.body.appendChild(spanEl);
    spanEl.classList.add('d-none');
    var rect = spanEl.getBoundingClientRect();
    document.body.removeChild(spanEl);
    if (!rect) {
        return 'bs3';
    }
    return rect.top === 0 ? 'bs4' : 'bs3';
}
function setTheme(theme) {
    guessedVersion = theme;
}
// todo: in ngx-bootstrap, bs4 will became a default one
function isBs3() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__facade_browser__["b" /* window */] === 'undefined') {
        return true;
    }
    if (typeof __WEBPACK_IMPORTED_MODULE_0__facade_browser__["b" /* window */].__theme === 'undefined') {
        if (guessedVersion) {
            return guessedVersion === 'bs3';
        }
        guessedVersion = _guessBsVersion();
        return guessedVersion === 'bs3';
    }
    return __WEBPACK_IMPORTED_MODULE_0__facade_browser__["b" /* window */].__theme !== 'bs4';
}
//# sourceMappingURL=theme-provider.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/utils/trigger.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Trigger; });
/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var Trigger = (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close || open;
    }
    Trigger.prototype.isManual = function () {
        return this.open === 'manual' || this.close === 'manual';
    };
    return Trigger;
}());

//# sourceMappingURL=trigger.class.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/utils/triggers.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parseTriggers */
/* unused harmony export listenToTriggers */
/* harmony export (immutable) */ __webpack_exports__["a"] = listenToTriggersV2;
/* harmony export (immutable) */ __webpack_exports__["b"] = registerOutsideClick;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__trigger_class__ = __webpack_require__("../../../../ngx-bootstrap/utils/trigger.class.js");

var DEFAULT_ALIASES = {
    hover: ['mouseover', 'mouseout'],
    focus: ['focusin', 'focusout']
};
function parseTriggers(triggers, aliases) {
    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    var parsedTriggers = trimmedTriggers
        .split(/\s+/)
        .map(function (trigger) { return trigger.split(':'); })
        .map(function (triggerPair) {
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new __WEBPACK_IMPORTED_MODULE_0__trigger_class__["a" /* Trigger */](alias[0], alias[1]);
    });
    var manualTriggers = parsedTriggers.filter(function (triggerPair) {
        return triggerPair.isManual();
    });
    if (manualTriggers.length > 1) {
        throw new Error('Triggers parse error: only one manual trigger is allowed');
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw new Error('Triggers parse error: manual trigger can\'t be mixed with other triggers');
    }
    return parsedTriggers;
}
function listenToTriggers(renderer, target, triggers, showFn, hideFn, toggleFn) {
    var parsedTriggers = parseTriggers(triggers);
    var listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    parsedTriggers.forEach(function (trigger) {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(target, trigger.open, toggleFn));
            return;
        }
        listeners.push(renderer.listen(target, trigger.open, showFn), renderer.listen(target, trigger.close, hideFn));
    });
    return function () {
        listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); });
    };
}
function listenToTriggersV2(renderer, options) {
    var parsedTriggers = parseTriggers(options.triggers);
    var target = options.target;
    // do nothing
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    // all listeners
    var listeners = [];
    // lazy listeners registration
    var _registerHide = [];
    var registerHide = function () {
        // add hide listeners to unregister array
        _registerHide.forEach(function (fn) { return listeners.push(fn()); });
        // register hide events only once
        _registerHide.length = 0;
    };
    // register open\close\toggle listeners
    parsedTriggers.forEach(function (trigger) {
        var useToggle = trigger.open === trigger.close;
        var showFn = useToggle ? options.toggle : options.show;
        if (!useToggle) {
            _registerHide.push(function () {
                return renderer.listen(target, trigger.close, options.hide);
            });
        }
        listeners.push(renderer.listen(target, trigger.open, function () { return showFn(registerHide); }));
    });
    return function () {
        listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); });
    };
}
function registerOutsideClick(renderer, options) {
    if (!options.outsideClick) {
        return Function.prototype;
    }
    return renderer.listen('document', 'click', function (event) {
        if (options.target && options.target.contains(event.target)) {
            return;
        }
        if (options.targets &&
            options.targets.some(function (target) { return target.contains(event.target); })) {
            return;
        }
        options.hide();
    });
}
//# sourceMappingURL=triggers.js.map

/***/ }),

/***/ "../../../../ngx-bootstrap/utils/utils.class.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_browser__ = __webpack_require__("../../../../ngx-bootstrap/utils/facade/browser.js");

var Utils = (function () {
    function Utils() {
    }
    Utils.reflow = function (element) {
        (function (bs) { return bs; })(element.offsetHeight);
    };
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    Utils.getStyles = function (elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = __WEBPACK_IMPORTED_MODULE_0__facade_browser__["b" /* window */];
        }
        return view.getComputedStyle(elem);
    };
    return Utils;
}());

//# sourceMappingURL=utils.class.js.map

/***/ })

});
//# sourceMappingURL=agent.module.chunk.js.map