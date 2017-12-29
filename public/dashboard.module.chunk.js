webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var dashboardRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_component__["a" /* DashboardComponent */] }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());
DashboardRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* RouterModule */].forChild(dashboardRoutes)],
        exports: [__WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* RouterModule */]]
    })
], DashboardRoutingModule);

//# sourceMappingURL=dashboard-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n      Dashboard\n      <small>Control panel</small>\n    </h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li class=\"active\">Dashboard</li>\n    </ol>\n  </section>\n\n  <!-- Main content -->\n  <section class=\"content\">\n    <!-- Small boxes (Stat box) -->\n    <div class=\"row\">\n      <div class=\"col-lg-3 col-xs-6\">\n        <!-- small box -->\n        <div class=\"small-box bg-aqua\">\n          <div class=\"inner\">\n            <h3>150</h3>\n\n            <p>New Orders</p>\n          </div>\n          <div class=\"icon\">\n            <i class=\"ion ion-bag\"></i>\n          </div>\n          <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n        </div>\n      </div>\n      <!-- ./col -->\n      <div class=\"col-lg-3 col-xs-6\">\n        <!-- small box -->\n        <div class=\"small-box bg-green\">\n          <div class=\"inner\">\n            <h3>53<sup style=\"font-size: 20px\">%</sup></h3>\n\n            <p>Bounce Rate</p>\n          </div>\n          <div class=\"icon\">\n            <i class=\"ion ion-stats-bars\"></i>\n          </div>\n          <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n        </div>\n      </div>\n      <!-- ./col -->\n      <div class=\"col-lg-3 col-xs-6\">\n        <!-- small box -->\n        <div class=\"small-box bg-yellow\">\n          <div class=\"inner\">\n            <h3>44</h3>\n\n            <p>User Registrations</p>\n          </div>\n          <div class=\"icon\">\n            <i class=\"ion ion-person-add\"></i>\n          </div>\n          <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n        </div>\n      </div>\n      <!-- ./col -->\n      <div class=\"col-lg-3 col-xs-6\">\n        <!-- small box -->\n        <div class=\"small-box bg-red\">\n          <div class=\"inner\">\n            <h3>65</h3>\n\n            <p>Unique Visitors</p>\n          </div>\n          <div class=\"icon\">\n            <i class=\"ion ion-pie-graph\"></i>\n          </div>\n          <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n        </div>\n      </div>\n      <!-- ./col -->\n    </div>\n    <!-- /.row -->\n  </section>\n  <!-- /.content -->\n\n  <section class=\"content\">\n    <!-- Info boxes -->\n    <div class=\"row\">\n      <div class=\"col-md-3 col-sm-6 col-xs-12\">\n        <div class=\"info-box\">\n          <span class=\"info-box-icon bg-aqua\"><i class=\"ion ion-ios-gear-outline\"></i></span>\n\n          <div class=\"info-box-content\">\n            <span class=\"info-box-text\">CPU Traffic</span>\n            <span class=\"info-box-number\">90<small>%</small></span>\n          </div>\n          <!-- /.info-box-content -->\n        </div>\n        <!-- /.info-box -->\n      </div>\n      <!-- /.col -->\n      <div class=\"col-md-3 col-sm-6 col-xs-12\">\n        <div class=\"info-box\">\n          <span class=\"info-box-icon bg-red\"><i class=\"fa fa-google-plus\"></i></span>\n\n          <div class=\"info-box-content\">\n            <span class=\"info-box-text\">Likes</span>\n            <span class=\"info-box-number\">41,410</span>\n          </div>\n          <!-- /.info-box-content -->\n        </div>\n        <!-- /.info-box -->\n      </div>\n      <!-- /.col -->\n\n      <!-- fix for small devices only -->\n      <div class=\"clearfix visible-sm-block\"></div>\n\n      <div class=\"col-md-3 col-sm-6 col-xs-12\">\n        <div class=\"info-box\">\n          <span class=\"info-box-icon bg-green\"><i class=\"ion ion-ios-cart-outline\"></i></span>\n\n          <div class=\"info-box-content\">\n            <span class=\"info-box-text\">Sales</span>\n            <span class=\"info-box-number\">760</span>\n          </div>\n          <!-- /.info-box-content -->\n        </div>\n        <!-- /.info-box -->\n      </div>\n      <!-- /.col -->\n      <div class=\"col-md-3 col-sm-6 col-xs-12\">\n        <div class=\"info-box\">\n          <span class=\"info-box-icon bg-yellow\"><i class=\"ion ion-ios-people-outline\"></i></span>\n\n          <div class=\"info-box-content\">\n            <span class=\"info-box-text\">New Members</span>\n            <span class=\"info-box-number\">2,000</span>\n          </div>\n          <!-- /.info-box-content -->\n        </div>\n        <!-- /.info-box -->\n      </div>\n      <!-- /.col -->\n    </div>\n  </section>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
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

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/dashboard/dashboard-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__dashboard_routing_module__["a" /* DashboardRoutingModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */]]
    })
], DashboardModule);

//# sourceMappingURL=dashboard.module.js.map

/***/ })

});
//# sourceMappingURL=dashboard.module.chunk.js.map