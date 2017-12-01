webpackJsonp(["admin.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/admin/admin-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_admin_create_admin_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_admin_list_admin_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_admin_create_admin_component__["a" /* CreateAdminComponent */] },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_admin_list_admin_component__["a" /* ListAdminComponent */] },
];
var AdminRoutingModule = (function () {
    function AdminRoutingModule() {
    }
    return AdminRoutingModule;
}());
AdminRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], AdminRoutingModule);

//# sourceMappingURL=admin-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/admin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/admin-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_admin_create_admin_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_admin_list_admin_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AdminModule = (function () {
    function AdminModule() {
    }
    return AdminModule;
}());
AdminModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__admin_routing_module__["a" /* AdminRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__create_admin_create_admin_component__["a" /* CreateAdminComponent */],
            __WEBPACK_IMPORTED_MODULE_4__list_admin_list_admin_component__["a" /* ListAdminComponent */]
        ]
    })
], AdminModule);

//# sourceMappingURL=admin.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <br><br><br><br><br>\n  <p>\n    create-admin works!\n  </p>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CreateAdminComponent = (function () {
    function CreateAdminComponent() {
    }
    CreateAdminComponent.prototype.ngOnInit = function () {
    };
    return CreateAdminComponent;
}());
CreateAdminComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-admin',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/create-admin/create-admin.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CreateAdminComponent);

//# sourceMappingURL=create-admin.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.html":
/***/ (function(module, exports) {

module.exports = "<br><br><br><br><br>\n<p>\n  list-admin works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListAdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ListAdminComponent = (function () {
    function ListAdminComponent() {
    }
    ListAdminComponent.prototype.ngOnInit = function () {
    };
    return ListAdminComponent;
}());
ListAdminComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-admin',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/admin/list-admin/list-admin.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ListAdminComponent);

//# sourceMappingURL=list-admin.component.js.map

/***/ })

});
//# sourceMappingURL=admin.module.chunk.js.map