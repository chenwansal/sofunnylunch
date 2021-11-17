"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = void 0;
class ServiceManager {
    constructor() {
        this.http = null;
    }
    Ctor(http, homeService) {
        this.http = http;
        this.homeService = homeService;
    }
    Init() {
        this.homeService.Init();
    }
    StartService() {
        this.http.Start();
    }
}
exports.ServiceManager = ServiceManager;
