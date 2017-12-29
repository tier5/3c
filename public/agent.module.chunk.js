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
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
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
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__agent_routing_module__["a" /* AgentRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3_angular2_text_mask__["TextMaskModule"],
            __WEBPACK_IMPORTED_MODULE_7__shared_shared_module__["a" /* SharedModule */]
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
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Agent Section</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <!-- /.box-header -->\n          <div class=\"box-body\" *ngIf=\"(authState | async).twilioIsActive\">\n            <form #form=\"ngForm\" (submit)=\"onSubmit(form)\">\n              <!-- text input -->\n              <div class=\"box-header with-border\">\n                <h3 class=\"box-title\">{{ editMode ? 'Edit': 'Create' }} Agent</h3>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                      <label class=\"control-label\" for=\"admin\">\n                        Admin for Agent\n                      </label>\n                      <select class=\"form-control\"\n                              id=\"admin\"\n                              name=\"parentId\"\n                              [disabled]=\"editMode || (authState | async).isAdmin\"\n                              #selectedAdmin\n                              [ngModel]=\"agent.parentId\"\n                              (change)=\"adminChanged(selectedAdmin.value)\"\n                              required\n                      >\n                        <option selected value=\"0\">Choose...</option>\n                        <option [value]=\"item.id\"\n                                *ngFor=\"let item of (afterLoginState | async).admin.list; let i = index\"\n                        >\n                          {{item.first_name}} {{item.last_name}}\n                        </option>\n                      </select>\n                    </div>\n                </div>\n\n                <div class=\"col-md-6\" *ngIf=\"selectedAdmin.value > 0\">\n                    <div class=\"form-group\">\n                    <label class=\"control-label\" for=\"department\">\n                      Department for Agent\n                    </label>\n                    <select class=\"form-control\"\n                            id=\"department\"\n                            name=\"departmentId\"\n                            [disabled]=\"editMode\"\n                            #selectedDepartment\n                            [ngModel]=\"agent.departmentId\"\n                            (change)=\"deptChanged(selectedDepartment.value)\"\n                            required\n                    >\n                      <option selected value=\"0\">Choose...</option>\n                      <option [value]=\"item.id\"\n                              *ngFor=\"let item of (afterLoginState | async).department.list; let i = index\"\n                      >\n                        {{item.department_name}}\n                      </option>\n                    </select>\n                  </div>\n                </div>\n\n              </div>\n\n              <div class=\"row\" *ngIf=\"selectDept\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(firstName.invalid && firstName.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"firstName\">First Name\n                      <i *ngIf=\"firstName.invalid && firstName.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"firstName\"\n                           name=\"firstName\"\n                           [ngModel]=\"agent.firstName\"\n                           #firstName=\"ngModel\"\n                           required\n                           placeholder=\"First Name\"\n                    >\n                    <span *ngIf=\"firstName.invalid && firstName.touched\" class=\"help-block\">Your First Name is Required !</span>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(lastName.invalid && lastName.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"lastName\">Last Name\n                      <i *ngIf=\"lastName.invalid && lastName.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"lastName\"\n                           name=\"lastName\"\n                           [ngModel]=\"agent.lastName\"\n                           #lastName=\"ngModel\"\n                           required\n                           placeholder=\"Last Name\"\n                    >\n                    <span *ngIf=\"lastName.invalid && lastName.touched\" class=\"help-block\">Your Last Name is Required !</span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" *ngIf=\"selectDept\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(email.invalid && email.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"email\">Email\n                      <i *ngIf=\"email.invalid && email.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"email\"\n                           class=\"form-control\"\n                           id=\"email\"\n                           name=\"email\"\n                           [ngModel]=\"agent.email\"\n                           #email=\"ngModel\"\n                           email\n                           required\n                           [disabled]=\"editMode\"\n                           placeholder=\"email\"\n                    >\n                    <span *ngIf=\"email.invalid && email.touched && form.controls.email?.errors.email\" class=\"help-block\">Please Enter a Proper Email Address!</span>\n                    <span *ngIf=\"email.invalid && email.touched && form.controls.email?.errors.required\" class=\"help-block\">Your Email Address is Required!</span>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(userName.invalid && userName.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"userName\">Username\n                      <i *ngIf=\"userName.invalid && userName.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           id=\"userName\"\n                           placeholder=\"Username\"\n                           [ngModel]=\"agent.userName\"\n                           name=\"userName\"\n                           required\n                           ngModel\n                           #userName=\"ngModel\"\n                    >\n                    <span *ngIf=\"userName.invalid && userName.touched\" class=\"help-block\">Your Username is Required !</span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" *ngIf=\"selectDept\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" [ngClass]=\"(phone.invalid && phone.touched) ? 'has-error': ''\">\n                    <label class=\"control-label\" for=\"phone\">Phone\n                      <i *ngIf=\"phone.invalid && phone.touched\" class=\"fa fa-times-circle-o\"></i>\n                    </label>\n                    <input type=\"text\"\n                           class=\"form-control\"\n                           [textMask]=\"{mask: mask, guide: false}\"\n                           id=\"phone\"\n                           placeholder=\"phone\"\n                           [ngModel]=\"agent.phone\"\n                           name=\"phone\"\n                           required\n                           ngModel\n                           #phone=\"ngModel\"\n                    >\n                    <span *ngIf=\"phone.invalid && phone.touched\" class=\"help-block\">Your Phone Number is Required !</span>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n\n                </div>\n              </div>\n\n              <div class=\"col-md-12\">\n                <div class=\"box-footer\">\n                  <button type=\"submit\" [disabled]=\"form.invalid || !selectDept\" class=\"btn btn-primary pull-right\" >Submit</button>\n                </div>\n              </div>\n            </form>\n          </div>\n          <div class=\"box-body\" *ngIf=\"!(authState | async).twilioIsActive\">\n            <h4>Twilio Credentials Not Added by SuperAdmin :-(</h4>\n          </div>\n          <!-- /.box-body -->\n        </div>\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n"

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
    function CreateAgentComponent(store, activatedRoute, cdr) {
        this.store = store;
        this.activatedRoute = activatedRoute;
        this.cdr = cdr;
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
                _this.form.reset();
                _this.selectDept = false;
                _this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["n" /* ResetAgentForm */]());
                if (!!_this.loggedInAdminId) {
                    _this.form.form.patchValue({ parentId: _this.loggedInAdminId, departmentId: 0 });
                }
            }
        });
    };
    CreateAgentComponent.prototype.ngAfterViewChecked = function () {
        this.cdr.detectChanges();
    };
    /** Function call to create or edit a admin */
    CreateAgentComponent.prototype.onSubmit = function (form) {
        if (this.editMode) {
            var data = __assign({}, form.value, { userId: this.userId });
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["f" /* EditAgentAttempt */](__assign({}, data)));
        }
        else {
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_6__store_agent_agent_actions__["c" /* AddAgentAttempt */](form.value));
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
            this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_7__store_department_department_actions__["k" /* GetDepartmentListAttempt */]({ userId: id }));
        }
    };
    /** Function to check if valid department is selected */
    CreateAgentComponent.prototype.deptChanged = function (id) {
        this.selectDept = id > 0;
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
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/create-agent/create-agent.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngrx_store__["h" /* Store */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]) === "function" && _d || Object])
], CreateAgentComponent);

var _a, _b, _c, _d;
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

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Agent List</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <div class=\"box-header\">\n            <h3 class=\"box-title\">Agent List</h3>\n          </div>\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <div id=\"example2_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap\"><div class=\"row\"><div class=\"col-sm-6\"></div><div class=\"col-sm-6\"></div></div><div class=\"row\"><div class=\"col-sm-12\"><table id=\"example2\" class=\"table table-bordered table-hover dataTable\" role=\"grid\" aria-describedby=\"example2_info\">\n              <thead>\n              <tr role=\"row\">\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Rendering engine: activate to sort column ascending\">#</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Rendering engine: activate to sort column ascending\">First Name</th>\n                <th class=\"sorting_desc\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Browser: activate to sort column ascending\" aria-sort=\"descending\">Last Name</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Platform(s): activate to sort column ascending\">Username</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Engine version: activate to sort column ascending\">Email</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"CSS grade: activate to sort column ascending\">Phone</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"CSS grade: activate to sort column ascending\">Action</th>\n              </tr>\n              </thead>\n              <tbody>\n              <tr role=\"row\" class=\"odd\" *ngFor=\"let item of (afterLoginState | async).agent.list; let i = index\">\n                <td>{{i}}</td>\n                <td>{{item.first_name}}</td>\n                <td>{{item.last_name}}</td>\n                <td>{{item.username}}</td>\n                <td>{{item.email}}</td>\n                <td>{{item.phone}}</td>\n                <td>\n                  <!-- Single button -->\n                  <div class=\"btn-group\" [appDropdown]=\"'open'\">\n                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                      Action <span class=\"caret\"></span>\n                    </button>\n                    <ul class=\"dropdown-menu\">\n                      <li> <a (click)=\"onEditAgent(item.id)\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>Edit</a> </li>\n                      <li *ngIf=\"item.profile_status == '1'\"> <a (click)=\"blockUser(item.id)\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i>Block</a> </li>\n                      <li *ngIf=\"item.profile_status == '2'\"> <a (click)=\"UnblockUser(item.id)\"><i class=\"fa fa-unlock\" aria-hidden=\"true\"></i>Unblock</a> </li>\n                    </ul>\n                  </div>\n                </td>\n              </tr>\n              </tbody>\n              <tfoot>\n              <tr>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Rendering engine: activate to sort column ascending\">#</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Rendering engine: activate to sort column ascending\">First Name</th>\n                <th class=\"sorting_desc\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Browser: activate to sort column ascending\" aria-sort=\"descending\">Last Name</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Platform(s): activate to sort column ascending\">Username</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"Engine version: activate to sort column ascending\">Email</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"CSS grade: activate to sort column ascending\">Phone</th>\n                <th class=\"sorting\" tabindex=\"0\" aria-controls=\"example2\" rowspan=\"1\" colspan=\"1\" aria-label=\"CSS grade: activate to sort column ascending\">Action</th>\n              </tr>\n              </tfoot>\n            </table>\n            </div>\n            </div>\n              <div class=\"row\">\n                <div class=\"col-sm-5\">\n                  <div class=\"dataTables_info\" id=\"example2_info\" role=\"status\" aria-live=\"polite\">Showing 1 to 10 of 57 entries</div>\n                </div>\n                <div class=\"col-sm-7 text-right\">\n                  <div class=\"dataTables_paginate paging_simple_numbers\" id=\"example2_paginate\">\n                    <ul class=\"pagination\">\n                      <li class=\"paginate_button previous disabled\" id=\"example2_previous\">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"0\" tabindex=\"0\">Previous</a>\n                      </li>\n                      <li class=\"paginate_button active\">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"1\" tabindex=\"0\">1</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"2\" tabindex=\"0\">2</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"3\" tabindex=\"0\">3</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"4\" tabindex=\"0\">4</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"5\" tabindex=\"0\">5</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"6\" tabindex=\"0\">6</a>\n                      </li>\n                      <li class=\"paginate_button next\" id=\"example2_next\">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"7\" tabindex=\"0\">Next</a>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!-- /.box-body -->\n        </div>\n        <!-- /.box -->\n        <div class=\"msg-popup\">\n          <p>This is a success msg!</p>\n        </div>\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListAgentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_agent_agent_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/agent/agent.actions.ts");
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
    function ListAgentComponent(store, router) {
        this.store = store;
        this.router = router;
    }
    /** Function to be executed when component initializes */
    ListAgentComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_3__store_agent_agent_actions__["k" /* GetAgentListAttempt */]());
        this.afterLoginState = this.store.select('afterLogin');
    };
    /** Function to Edit Agent */
    ListAgentComponent.prototype.onEditAgent = function (id) {
        this.router.navigate(['agent/edit/', id]);
    };
    return ListAgentComponent;
}());
ListAgentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-agent',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/agent/list-agent/list-agent.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object])
], ListAgentComponent);

var _a, _b;
//# sourceMappingURL=list-agent.component.js.map

/***/ })

});
//# sourceMappingURL=agent.module.chunk.js.map