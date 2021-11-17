"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionProcess = void 0;
const jackwebutil_1 = require("jackwebutil");
const UserSystem_1 = require("../ServiceManager/HomeService/UserAggregate/UserSystem");
const HomeSerivce_1 = require("../ServiceManager/HomeService/HomeSerivce");
const ServiceManager_1 = require("../ServiceManager/ServiceManager");
class InjectionProcess {
    constructor() { }
    Run(container) {
        this.InjectServiceManager(container);
    }
    InjectServiceManager(container) {
        let serviceManager = container.Get(ServiceManager_1.ServiceManager.name);
        let httpServer = container.Get(jackwebutil_1.HttpServer.name);
        let homeService = container.Get(HomeSerivce_1.HomeService.name);
        let userSystem = container.Get(UserSystem_1.UserSystem.name);
        serviceManager.Ctor(httpServer, homeService);
        homeService.Ctor(httpServer, userSystem);
    }
}
exports.InjectionProcess = InjectionProcess;
