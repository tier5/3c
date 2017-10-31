webpackJsonp(["widget.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.html":
/***/ (function(module, exports) {

module.exports = "<br><br><br><br><br>\n<p>\n  create-widget works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateWidgetComponent; });
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

var CreateWidgetComponent = (function () {
    function CreateWidgetComponent() {
    }
    CreateWidgetComponent.prototype.ngOnInit = function () {
    };
    return CreateWidgetComponent;
}());
CreateWidgetComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-widget',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CreateWidgetComponent);

//# sourceMappingURL=create-widget.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.html":
/***/ (function(module, exports) {

module.exports = "<br><br><br><br><br>\n<p>\n  list-widget works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListWidgetComponent; });
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

var ListWidgetComponent = (function () {
    function ListWidgetComponent() {
    }
    ListWidgetComponent.prototype.ngOnInit = function () {
    };
    return ListWidgetComponent;
}());
ListWidgetComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list-widget',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ListWidgetComponent);

//# sourceMappingURL=list-widget.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/widget-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WidgetRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_widget_create_widget_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_widget_list_widget_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_2__create_widget_create_widget_component__["a" /* CreateWidgetComponent */] },
    { path: 'list', component: __WEBPACK_IMPORTED_MODULE_3__list_widget_list_widget_component__["a" /* ListWidgetComponent */] }
];
var WidgetRoutingModule = (function () {
    function WidgetRoutingModule() {
    }
    return WidgetRoutingModule;
}());
WidgetRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], WidgetRoutingModule);

//# sourceMappingURL=widget-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/widget/widget.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetModule", function() { return WidgetModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__widget_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/widget-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_widget_list_widget_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/list-widget/list-widget.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_widget_create_widget_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/widget/create-widget/create-widget.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var WidgetModule = (function () {
    function WidgetModule() {
    }
    return WidgetModule;
}());
WidgetModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__widget_routing_module__["a" /* WidgetRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__create_widget_create_widget_component__["a" /* CreateWidgetComponent */],
            __WEBPACK_IMPORTED_MODULE_3__list_widget_list_widget_component__["a" /* ListWidgetComponent */],
        ]
    })
], WidgetModule);

//# sourceMappingURL=widget.module.js.map

/***/ })

});
//# sourceMappingURL=widget.module.chunk.js.map