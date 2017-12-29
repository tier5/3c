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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_routing_module__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/chat-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pending_pending_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ongoing_ongoing_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rejected_rejected_component__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.ts");
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
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__chat_routing_module__["a" /* ChatRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__pending_pending_component__["a" /* PendingComponent */],
            __WEBPACK_IMPORTED_MODULE_5__ongoing_ongoing_component__["a" /* OngoingComponent */],
            __WEBPACK_IMPORTED_MODULE_6__rejected_rejected_component__["a" /* RejectedComponent */]
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
exports.push([module.i, "h2{\n    background: #fff;\n    text-align: center;\n    margin: 0;\n    padding: 15px;\n    color: #000;\n    font-size: 20px;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    box-shadow: 1px 1px 1px 1px #ebebeb;\n    -webkit-box-shadow: 1px 1px 1px 1px #ebebeb;\n    -moz-box-shadow: 1px 1px 1px 1px #ebebeb;\n}\n.box{\n    margin-top: 5px;\n    border: 0;\n}\n.chat-list{\n    display: inline-block;\n    width: 100%;\n}\n.chat-list ul{\n    margin: 5px 0 0;\n    padding: 0;\n    list-style-type: none;\n    background: #fff;\n    max-height: 705px;\n    overflow-y: auto;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n}\n.chat-list ul li{\n    display: inline-block;\n    width: 100%;\n    padding: 15px 0;\n    border-bottom: 1px solid #f4f4f4;\n    cursor: pointer;\n    vertical-align: top;\n}\n.chat-list ul li:last-child{\n    border: 0;\n}\n.chat-list ul li:hover, .chat-list ul li.active {\n    background: #3c8dbc;\n    box-shadow: 1px 1px 1px 1px #666;\n    border-bottom: 1px solid #3c8dbc;\n}\n.chat-head img{\n    border-radius: 50%;\n    margin: auto;\n    width: 40px;\n    height: 40px;\n}\n.chat-content h3{\n    margin: 0 0 5px;\n    font-size: 16px;\n    font-weight: bold;\n    color: #3c8dbc;\n}\n.chat-content h3 span{\n    float: right;\n    font-weight: normal;\n    font-size: 12px;\n    color: #000;\n}\n.chat-list ul li:hover h3,.chat-list ul li.active h3{\n    color: #fff;\n}\n.chat-list ul li:hover h3 span, .chat-list ul li.active h3 span{\n    color: #fff;\n}\n.chat-list ul li:hover p, .chat-list ul li.active p{\n    color: #fff;\n}\n.chat-box{\n    padding: 20px;\n}\n.receiver, .sender{\n    display: inline-block;\n    width: 100%;\n    padding: 20px 0;\n}\n.sender .chat-content{\n    text-align: right;\n    border-radius: 5px;\n}\n.receiver .chat-content{\n    background: #3c8dbc;\n    color: #fff;\n    padding: 15px;\n    border-radius: 5px;\n}\n.sender .chat-content p, .receiver .chat-content p {\n    margin: 0;\n}\n.direct-chat-msg {\n    margin-bottom: 20px;\n}\n.direct-chat-messages {\n    height: 650px;\n}\n\n/*.active {*/\n    /*background: #3c8dbc;*/\n    /*box-shadow: 1px 1px 1px 1px #666;*/\n    /*border-bottom: 1px solid #3c8dbc;*/\n/*}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Ongoing Chats</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <div class=\"col-xs-12\">\n            <div class=\"row\">\n              <h2>Messages</h2>\n            </div>\n          </div>\n          <div class=\"col-md-3 col-sm-3\">\n            <div class=\"row\">\n              <div class=\"chat-list\">\n                <ul>\n                  <li [ngClass]=\"{ active : currentChatIndex == i}\" *ngFor=\"let contact of (chatState | async).ongoing; let i = index;\" (click)=\"changeCurrentChat(i)\">\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>{{contact.client}} <span>5 days</span></h3>\n                        <p>{{contact.room}}</p>\n                      </div>\n                    </div>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-9 col-sm-9\">\n            <div class=\"box box-primary direct-chat direct-chat-primary\">\n              <div class=\"box-body\">\n                <!-- Conversations are loaded here -->\n                <div class=\"direct-chat-messages\">\n                  <!-- Message. Default to the left -->\n                  <div class=\"direct-chat-msg\" [ngClass]=\"{ right: chat.direction == 2 }\" *ngFor=\"let chat of (chatState | async).ongoing[currentChatIndex]?.chats\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name\" [ngClass]=\"chat.direction == 2 ? 'pull-right' : 'pull-left'\">{{chat.user}}</span>\n                      <span class=\"direct-chat-timestamp\" [ngClass]=\"chat.direction == 1 ? 'pull-right' : 'pull-left'\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" [src]=\"chat.direction == 2 ?  '../../../../assets/img/user1-128x128.jpg' : '../../../../assets/img/user3-128x128.jpg'\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      {{chat.message}}\n                    </div>\n                  </div>\n                  <div *ngIf=\"(chatState | async).ongoing[currentChatIndex]?.status == 1\">\n                    <button (click)=\"onAccept()\" class=\"btn btn-primary\">Accept</button>\n                    <button (click)=\"onDecline()\" class=\"btn btn-danger\">Reject</button>\n                  </div>\n\n                </div>\n                <!--/.direct-chat-messages-->\n\n              </div>\n              <!-- /.box-body -->\n              <div class=\"box-footer\" *ngIf=\"(chatState | async).ongoing[currentChatIndex]?.status != 1\">\n                <form #form=\"ngForm\" (submit)=\"sendMsg(form)\">\n                  <div class=\"input-group\">\n                    <input type=\"text\"\n                           name=\"messageBody\"\n                           placeholder=\"Type Message ...\"\n                           class=\"form-control\"\n                           ngModel\n                           required\n                    >\n                    <span class=\"input-group-btn\">\n                        <button type=\"submit\"\n                                [disabled]=\"form.invalid\"\n                                class=\"btn btn-primary btn-flat\">\n                          Send\n                        </button>\n                      </span>\n                  </div>\n                </form>\n              </div>\n              <!-- /.box-footer-->\n            </div>\n          </div>\n        </div>\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OngoingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_service__ = __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__("../../../../@ngrx/store/@ngrx/store.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__("../../../../rxjs/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__);
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




var OngoingComponent = (function () {
    function OngoingComponent(store, chatService) {
        this.store = store;
        this.chatService = chatService;
        this.currentChatIndex = 0;
    }
    OngoingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatState = this.store.select('afterLogin')
            .map(function (data) { return data.chat; });
        this.getChatRoom();
        this.store.select('auth')
            .take(1)
            .map(function (data) { return data.userId; })
            .distinctUntilChanged()
            .subscribe(function (id) {
            _this.agentId = id;
        });
    };
    OngoingComponent.prototype.changeCurrentChat = function (i) {
        this.currentChatIndex = i;
        this.getChatRoom();
    };
    OngoingComponent.prototype.onAccept = function () {
        this.chatService.accept({ agentId: this.agentId, status: 2, chatRoomId: this.currentChatRoom });
    };
    OngoingComponent.prototype.onDecline = function () {
        console.log();
    };
    OngoingComponent.prototype.getChatRoom = function () {
        var _this = this;
        this.chatRoomSubscription = this.store.select('afterLogin')
            .subscribe(function (data) {
            if (data.chat.ongoing[_this.currentChatIndex] && !data.chat.ongoing[_this.currentChatIndex].length) {
                _this.currentChatRoom = data.chat.ongoing[_this.currentChatIndex].room;
            }
        });
    };
    OngoingComponent.prototype.sendMsg = function (form) {
        this.chatService.sendMsg(__assign({}, form.value, { chatRoomId: this.currentChatRoom }));
        form.reset();
    };
    OngoingComponent.prototype.ngOnDestroy = function () {
        this.chatRoomSubscription.unsubscribe();
    };
    return OngoingComponent;
}());
OngoingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-ongoing',
        template: __webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.html"),
        styles: [__webpack_require__("../../../../../src/app/core/layout/inner-pages/chat/ongoing/ongoing.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["h" /* Store */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__chat_service__["a" /* ChatService */]) === "function" && _b || Object])
], OngoingComponent);

var _a, _b;
//# sourceMappingURL=ongoing.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h2{\n    background: #fff;\n    text-align: center;\n    margin: 0;\n    padding: 15px;\n    color: #000;\n    font-size: 20px;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    box-shadow: 1px 1px 1px 1px #ebebeb;\n    -webkit-box-shadow: 1px 1px 1px 1px #ebebeb;\n    -moz-box-shadow: 1px 1px 1px 1px #ebebeb;\n}\n.box{\n    margin-top: 5px;\n    border: 0;\n}\n.chat-list{\n    display: inline-block;\n    width: 100%;\n}\n.chat-list ul{\n    margin: 5px 0 0;\n    padding: 0;\n    list-style-type: none;\n    background: #fff;\n    max-height: 705px;\n    overflow-y: auto;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n}\n.chat-list ul li{\n    display: inline-block;\n    width: 100%;\n    padding: 15px 0;\n    border-bottom: 1px solid #f4f4f4;\n    cursor: pointer;\n    vertical-align: top;\n}\n.chat-list ul li:last-child{\n    border: 0;\n}\n.chat-list ul li:hover{\n    background: #3c8dbc;\n    box-shadow: 1px 1px 1px 1px #666;\n    border-bottom: 1px solid #3c8dbc;\n}\n.chat-head img{\n    border-radius: 50%;\n    margin: auto;\n    width: 40px;\n    height: 40px;\n}\n.chat-content h3{\n    margin: 0 0 5px;\n    font-size: 16px;\n    font-weight: bold;\n    color: #3c8dbc;\n}\n.chat-content h3 span{\n    float: right;\n    font-weight: normal;\n    font-size: 12px;\n    color: #000;\n}\n.chat-list ul li:hover h3{\n    color: #fff;\n}\n.chat-list ul li:hover h3 span{\n    color: #fff;\n}\n.chat-list ul li:hover p{\n    color: #fff;\n}\n.chat-box{\n    padding: 20px;\n}\n.receiver, .sender{\n    display: inline-block;\n    width: 100%;\n    padding: 20px 0;\n}\n.sender .chat-content{\n    text-align: right;\n    border-radius: 5px;\n}\n.receiver .chat-content{\n    background: #3c8dbc;\n    color: #fff;\n    padding: 15px;\n    border-radius: 5px;\n}\n.sender .chat-content p, .receiver .chat-content p {\n    margin: 0;\n}\n.direct-chat-msg {\n    margin-bottom: 20px;\n}\n.direct-chat-messages {\n    height: 650px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/pending/pending.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Pending Chats</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <div class=\"col-xs-12\">\n            <div class=\"row\">\n              <h2>Messages</h2>\n            </div>\n          </div>\n          <div class=\"col-md-3 col-sm-3\">\n            <div class=\"row\">\n              <div class=\"chat-list\">\n                <ul>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n              </ul>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-9 col-sm-9\">\n            <div class=\"box box-primary direct-chat direct-chat-primary\">\n              <div class=\"box-body\">\n                <!-- Conversations are loaded here -->\n                <div class=\"direct-chat-messages\">\n                  <!-- Message. Default to the left -->\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                </div>\n                <!--/.direct-chat-messages-->\n\n                <!-- Contacts are loaded here -->\n                <div class=\"direct-chat-contacts\">\n                  <ul class=\"contacts-list\">\n                    <li>\n                      <a href=\"#\">\n                        <img class=\"contacts-list-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"User Image\">\n\n                        <div class=\"contacts-list-info\">\n                            <span class=\"contacts-list-name\">\n                              Count Dracula\n                              <small class=\"contacts-list-date pull-right\">2/28/2015</small>\n                            </span>\n                          <span class=\"contacts-list-msg\">How have you been? I was...</span>\n                        </div>\n                        <!-- /.contacts-list-info -->\n                      </a>\n                    </li>\n                    <!-- End Contact Item -->\n                  </ul>\n                  <!-- /.contatcts-list -->\n                </div>\n                <!-- /.direct-chat-pane -->\n              </div>\n              <!-- /.box-body -->\n              <div class=\"box-footer\">\n                <form action=\"#\" method=\"post\">\n                  <div class=\"input-group\">\n                    <input type=\"text\" name=\"message\" placeholder=\"Type Message ...\" class=\"form-control\">\n                    <span class=\"input-group-btn\">\n                        <button type=\"submit\" class=\"btn btn-primary btn-flat\">Send</button>\n                      </span>\n                  </div>\n                </form>\n              </div>\n              <!-- /.box-footer-->\n            </div>\n          </div>\n        </div>\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n\n\n\n"

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
exports.push([module.i, "h2{\n    background: #fff;\n    text-align: center;\n    margin: 0;\n    padding: 15px;\n    color: #000;\n    font-size: 20px;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    box-shadow: 1px 1px 1px 1px #ebebeb;\n    -webkit-box-shadow: 1px 1px 1px 1px #ebebeb;\n    -moz-box-shadow: 1px 1px 1px 1px #ebebeb;\n}\n.box{\n    margin-top: 5px;\n    border: 0;\n}\n.chat-list{\n    display: inline-block;\n    width: 100%;\n}\n.chat-list ul{\n    margin: 5px 0 0;\n    padding: 0;\n    list-style-type: none;\n    background: #fff;\n    max-height: 705px;\n    overflow-y: auto;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n}\n.chat-list ul li{\n    display: inline-block;\n    width: 100%;\n    padding: 15px 0;\n    border-bottom: 1px solid #f4f4f4;\n    cursor: pointer;\n    vertical-align: top;\n}\n.chat-list ul li:last-child{\n    border: 0;\n}\n.chat-list ul li:hover{\n    background: #3c8dbc;\n    box-shadow: 1px 1px 1px 1px #666;\n    border-bottom: 1px solid #3c8dbc;\n}\n.chat-head img{\n    border-radius: 50%;\n    margin: auto;\n    width: 40px;\n    height: 40px;\n}\n.chat-content h3{\n    margin: 0 0 5px;\n    font-size: 16px;\n    font-weight: bold;\n    color: #3c8dbc;\n}\n.chat-content h3 span{\n    float: right;\n    font-weight: normal;\n    font-size: 12px;\n    color: #000;\n}\n.chat-list ul li:hover h3{\n    color: #fff;\n}\n.chat-list ul li:hover h3 span{\n    color: #fff;\n}\n.chat-list ul li:hover p{\n    color: #fff;\n}\n.chat-box{\n    padding: 20px;\n}\n.receiver, .sender{\n    display: inline-block;\n    width: 100%;\n    padding: 20px 0;\n}\n.sender .chat-content{\n    text-align: right;\n    border-radius: 5px;\n}\n.receiver .chat-content{\n    background: #3c8dbc;\n    color: #fff;\n    padding: 15px;\n    border-radius: 5px;\n}\n.sender .chat-content p, .receiver .chat-content p {\n    margin: 0;\n}\n.direct-chat-msg {\n    margin-bottom: 20px;\n}\n.direct-chat-messages {\n    height: 650px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/core/layout/inner-pages/chat/rejected/rejected.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-wrapper\">\n  <section class=\"content-header\">\n    <h1>Pending Chats</h1>\n    <ol class=\"breadcrumb\">\n      <li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Home</a></li>\n      <li><a href=\"#\">Tables</a></li>\n      <li class=\"active\">Data tables</li>\n    </ol>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <div class=\"col-xs-12\">\n            <div class=\"row\">\n              <h2>Messages</h2>\n            </div>\n          </div>\n          <div class=\"col-md-3 col-sm-3\">\n            <div class=\"row\">\n              <div class=\"chat-list\">\n                <ul>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                  <li>\n                    <div class=\"col-md-2\">\n                      <div class=\"chat-head row\">\n                        <img src=\"../../../../assets/img/avatar5.png\" class=\"img-responsive\">\n                      </div>\n                    </div>\n                    <div class=\"col-md-10\">\n                      <div class=\"chat-content\">\n                        <h3>Corey Simmons <span>5 days</span></h3>\n                        <p>Lorem Ipsum is simply...</p>\n                      </div>\n                    </div>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-9 col-sm-9\">\n            <div class=\"box box-primary direct-chat direct-chat-primary\">\n              <div class=\"box-body\">\n                <!-- Conversations are loaded here -->\n                <div class=\"direct-chat-messages\">\n                  <!-- Message. Default to the left -->\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                  <div class=\"direct-chat-msg\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-left\">Alexander Pierce</span>\n                      <span class=\"direct-chat-timestamp pull-right\">23 Jan 2:00 pm</span>\n                    </div>\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      Is this template really for free? That's unbelievable!\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-msg right\">\n                    <div class=\"direct-chat-info clearfix\">\n                      <span class=\"direct-chat-name pull-right\">Sarah Bullock</span>\n                      <span class=\"direct-chat-timestamp pull-left\">23 Jan 2:05 pm</span>\n                    </div>\n                    <!-- /.direct-chat-info -->\n                    <img class=\"direct-chat-img\" src=\"../../../../assets/img/user3-128x128.jpg\" alt=\"Message User Image\"><!-- /.direct-chat-img -->\n                    <div class=\"direct-chat-text\">\n                      You better believe it!\n                    </div>\n                    <!-- /.direct-chat-text -->\n                  </div>\n                </div>\n                <!--/.direct-chat-messages-->\n\n                <!-- Contacts are loaded here -->\n                <div class=\"direct-chat-contacts\">\n                  <ul class=\"contacts-list\">\n                    <li>\n                      <a href=\"#\">\n                        <img class=\"contacts-list-img\" src=\"../../../../assets/img/user1-128x128.jpg\" alt=\"User Image\">\n\n                        <div class=\"contacts-list-info\">\n                            <span class=\"contacts-list-name\">\n                              Count Dracula\n                              <small class=\"contacts-list-date pull-right\">2/28/2015</small>\n                            </span>\n                          <span class=\"contacts-list-msg\">How have you been? I was...</span>\n                        </div>\n                        <!-- /.contacts-list-info -->\n                      </a>\n                    </li>\n                    <!-- End Contact Item -->\n                  </ul>\n                  <!-- /.contatcts-list -->\n                </div>\n                <!-- /.direct-chat-pane -->\n              </div>\n              <!-- /.box-body -->\n              <div class=\"box-footer\">\n                <form action=\"#\" method=\"post\">\n                  <div class=\"input-group\">\n                    <input type=\"text\" name=\"message\" placeholder=\"Type Message ...\" class=\"form-control\">\n                    <span class=\"input-group-btn\">\n                        <button type=\"submit\" class=\"btn btn-primary btn-flat\">Send</button>\n                      </span>\n                  </div>\n                </form>\n              </div>\n              <!-- /.box-footer-->\n            </div>\n          </div>\n        </div>\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n</div>\n\n\n\n"

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