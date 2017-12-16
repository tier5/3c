webpackJsonp(["twilio.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Twilio Section</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <form #form=\"ngForm\" (submit)=\"onSubmit(form)\">\n              <!-- text input -->\n              <div class=\"box-header with-border\">\n                <h3 class=\"box-title\">Create Twilio Credentials</h3>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': sid.invalid && sid.touched }\">\n                  <label class=\"control-label\" for=\"tSid\">\n                    <i *ngIf=\"sid.invalid && sid.touched\" class=\"fa fa-times-circle-o\"></i>\n                     Twilio SID\n                  </label>\n                  <input type=\"text\"\n                         class=\"form-control\"\n                         id=\"tSid\"\n                         name=\"twilio_sid\"\n                         [ngModel]=\"twilio.twilio_sid\"\n                         [disabled]=\"(authState | async).twilioIsActive\"\n                         #sid=\"ngModel\"\n                         required\n                         placeholder=\"Enter ...\"\n                  >\n                  <span *ngIf=\"sid.invalid && sid.touched\" class=\"help-block\">Your Twilio SID is Required!</span>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': token.invalid && token.touched }\">\n                  <label class=\"control-label\" for=\"tToken\">\n                    <i *ngIf=\"token.invalid && token.touched\" class=\"fa fa-times-circle-o\"></i>\n                     Twilio Token\n                  </label>\n                  <input type=\"text\"\n                         class=\"form-control\"\n                         id=\"tToken\"\n                         name=\"twilio_token\"\n                         [ngModel]=\"twilio.twilio_token\"\n                         [disabled]=\"(authState | async).twilioIsActive\"\n                         #token=\"ngModel\"\n                         required\n                         placeholder=\"Enter ...\"\n                  >\n                  <span *ngIf=\"token.invalid && token.touched\" class=\"help-block\">Your Twilio Token is Required!</span>\n                </div>\n              </div>\n              <div class=\"col-md-12\" *ngIf=\"!(authState | async).twilioIsActive\">\n                <div class=\"box-footer\">\n                  <button type=\"submit\"\n                          [disabled]=\"form.invalid\"\n                          class=\"btn btn-primary pull-right\"\n                  >\n                    Submit\n                  </button>\n                </div>\n              </div>\n            </form>\n          </div>\n          <!-- /.box-body -->\n        </div>\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTwilioComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_twilio_twilio_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/twilio/twilio.actions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreateTwilioComponent = (function () {
    /** Service injection */
    function CreateTwilioComponent(store) {
        this.store = store;
        this.twilio = {
            twilio_sid: '',
            twilio_token: '',
        };
    }
    /** Function to be executed when component initializes */
    CreateTwilioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_2__store_twilio_twilio_actions__["g" /* GetTwilioAttempt */]());
        this.authState = this.store.select('auth');
        this.store.select('afterLogin')
            .map(function (data) { return data.twilio.info; })
            .subscribe(function (afterLogin) {
            if (afterLogin !== null) {
                _this.twilio.twilio_sid = afterLogin.twilio_sid;
                _this.twilio.twilio_token = afterLogin.twilio_token;
            }
        });
    };
    /** Function call to submit the form */
    CreateTwilioComponent.prototype.onSubmit = function (form) {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_2__store_twilio_twilio_actions__["b" /* AddTwilioAttempt */](form.value));
    };
    return CreateTwilioComponent;
}());
CreateTwilioComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-twilio',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* Store */]) === "function" && _a || Object])
], CreateTwilioComponent);

var _a;
//# sourceMappingURL=create-twilio.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Twilio Section</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <div class=\"box-header with-border\">\n            <h3 class=\"box-title\">List of Twilio Accounts</h3>\n          </div>\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <div id=\"example2_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap\">\n              <div class=\"row\">\n                <div class=\"col-sm-6\"></div>\n                <div class=\"col-sm-6\"></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-12\">\n                  <table id=\"example2\" class=\"table table-bordered table-hover dataTable\" role=\"grid\" aria-describedby=\"example2_info\">\n              <thead>\n              <tr role=\"row\">\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >#</th>\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >User</th>\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >User Name</th>\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Email Address</th>\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Twilio SID</th>\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Twilio Account Type</th>\n                <th class=\"sorting\" rowspan=\"1\" colspan=\"1\" >Status</th>\n              </tr>\n              </thead>\n              <tbody>\n                <tr role=\"row\" class=\"odd\" *ngFor=\"let item of (afterLoginState | async).twilio.list; let i = index\">\n                  <td>{{i+1}}</td>\n                  <td>{{item.user_info.first_name}} {{item.user_info.last_name}}</td>\n                  <td>{{item.user_info.username}}</td>\n                  <td>{{item.user_info.email}}</td>\n                  <td>{{item.twilio_sid}}</td>\n                  <td>{{ item.user_info.type == '1' ? 'Main Account' : 'Subaccount' }} </td>                  \n                  <td>{{item.status}}</td>\n                </tr>\n              </tbody>\n              <tfoot>\n                <tr>\n                  <th rowspan=\"1\" colspan=\"1\">#</th>\n                  <th rowspan=\"1\" colspan=\"1\">User</th>\n                  <th rowspan=\"1\" colspan=\"1\">User Name</th>\n                  <th rowspan=\"1\" colspan=\"1\">Email Address</th>\n                  <th rowspan=\"1\" colspan=\"1\">Twilio SID</th>\n                  <th rowspan=\"1\" colspan=\"1\">Twilio Account Type</th>\n                  <th rowspan=\"1\" colspan=\"1\">Status</th>\n                </tr>\n              </tfoot>\n            </table>\n            </div>\n            </div>\n              <!-- Pagination -->\n              <div class=\"row\">\n                <div class=\"col-sm-5\">\n                  <div class=\"dataTables_info\" id=\"example2_info\" role=\"status\" aria-live=\"polite\">Showing 1 to 10 of 57 entries</div>\n                </div>\n                <div class=\"col-sm-7 text-right\">\n                  <div class=\"dataTables_paginate paging_simple_numbers\" id=\"example2_paginate\">\n                    <ul class=\"pagination\">\n                      <li class=\"paginate_button previous disabled\" id=\"example2_previous\">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"0\" tabindex=\"0\">Previous</a>\n                      </li>\n                      <li class=\"paginate_button active\">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"1\" tabindex=\"0\">1</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"2\" tabindex=\"0\">2</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"3\" tabindex=\"0\">3</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"4\" tabindex=\"0\">4</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"5\" tabindex=\"0\">5</a>\n                      </li>\n                      <li class=\"paginate_button \">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"6\" tabindex=\"0\">6</a>\n                      </li>\n                      <li class=\"paginate_button next\" id=\"example2_next\">\n                        <a href=\"#\" aria-controls=\"example2\" data-dt-idx=\"7\" tabindex=\"0\">Next</a>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!-- /.box-body -->\n        </div>\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListTwilioComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_twilio_twilio_actions__ = __webpack_require__("../../../../../src/app/core/layout/store/twilio/twilio.actions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListTwilioComponent = (function () {
    /** Service injection */
    function ListTwilioComponent(store) {
        this.store = store;
    }
    /** Function to be executed when component initializes */
    ListTwilioComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new __WEBPACK_IMPORTED_MODULE_2__store_twilio_twilio_actions__["h" /* GetTwilioListAttempt */]());
        this.afterLoginState = this.store.select('afterLogin');
    };
    return ListTwilioComponent;
}());
ListTwilioComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-twilio',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["h" /* Store */]) === "function" && _a || Object])
], ListTwilioComponent);

var _a;
//# sourceMappingURL=list-twilio.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/twilio-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwilioRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_twilio_create_twilio_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_twilio_list_twilio_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_twilio_create_twilio_component__["a" /* CreateTwilioComponent */] },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_twilio_list_twilio_component__["a" /* ListTwilioComponent */] }
];
var TwilioRoutingModule = (function () {
    function TwilioRoutingModule() {
    }
    return TwilioRoutingModule;
}());
TwilioRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], TwilioRoutingModule);

//# sourceMappingURL=twilio-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/twilio/twilio.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwilioModule", function() { return TwilioModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_twilio_create_twilio_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/create-twilio/create-twilio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_twilio_list_twilio_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/list-twilio/list-twilio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__twilio_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/twilio/twilio-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TwilioModule = (function () {
    function TwilioModule() {
    }
    return TwilioModule;
}());
TwilioModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__twilio_routing_module__["a" /* TwilioRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_twilio_create_twilio_component__["a" /* CreateTwilioComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_twilio_list_twilio_component__["a" /* ListTwilioComponent */]
        ]
    })
], TwilioModule);

//# sourceMappingURL=twilio.module.js.map

/***/ })

});
//# sourceMappingURL=twilio.module.chunk.js.map