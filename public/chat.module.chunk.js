webpackJsonp(["chat.module"],{

/***/ "../../../../../src/app/core/layout/inner-pages/chat/chat-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ongoing_ongoing_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pending_pending_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rejected_rejected_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: 'pending', component: __WEBPACK_IMPORTED_MODULE_3__pending_pending_component__["a" /* PendingComponent */] },
    { path: 'ongoing', component: __WEBPACK_IMPORTED_MODULE_2__ongoing_ongoing_component__["a" /* OngoingComponent */] },
    { path: 'rejected', component: __WEBPACK_IMPORTED_MODULE_4__rejected_rejected_component__["a" /* RejectedComponent */] }
];
var ChatRoutingModule = (function () {
    function ChatRoutingModule() {
    }
    return ChatRoutingModule;
}());
ChatRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], ChatRoutingModule);

//# sourceMappingURL=chat-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/chat.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatModule", function() { return ChatModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/chat-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pending_pending_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ongoing_ongoing_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rejected_rejected_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ChatModule = (function () {
    function ChatModule() {
    }
    return ChatModule;
}());
ChatModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__chat_routing_module__["a" /* ChatRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__pending_pending_component__["a" /* PendingComponent */],
            __WEBPACK_IMPORTED_MODULE_4__ongoing_ongoing_component__["a" /* OngoingComponent */],
            __WEBPACK_IMPORTED_MODULE_5__rejected_rejected_component__["a" /* RejectedComponent */]
        ]
    })
], ChatModule);

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.html":
/***/ (function(module, exports) {

module.exports = "<br><br><br><br><br>\n<p>\n  ongoing works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OngoingComponent; });
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

var OngoingComponent = (function () {
    function OngoingComponent() {
    }
    OngoingComponent.prototype.ngOnInit = function () {
    };
    return OngoingComponent;
}());
OngoingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-ongoing',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.css")]
    }),
    __metadata("design:paramtypes", [])
], OngoingComponent);

//# sourceMappingURL=ongoing.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.html":
/***/ (function(module, exports) {

module.exports = "<br><br><br><br><br>\n<p>\n  pending works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PendingComponent; });
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

var PendingComponent = (function () {
    function PendingComponent() {
    }
    PendingComponent.prototype.ngOnInit = function () {
    };
    return PendingComponent;
}());
PendingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-pending',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PendingComponent);

//# sourceMappingURL=pending.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.html":
/***/ (function(module, exports) {

module.exports = "<br><br><br><br><br>\n<p>\n  rejected works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RejectedComponent; });
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

var RejectedComponent = (function () {
    function RejectedComponent() {
    }
    RejectedComponent.prototype.ngOnInit = function () {
    };
    return RejectedComponent;
}());
RejectedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-rejected',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.css")]
    }),
    __metadata("design:paramtypes", [])
], RejectedComponent);

//# sourceMappingURL=rejected.component.js.map

/***/ })

});
//# sourceMappingURL=chat.module.chunk.js.map