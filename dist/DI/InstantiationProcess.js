"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantiationProcess = void 0;
const jackwebutil_1 = require("jackwebutil");
const GeneralService_1 = require("../ServiceManager/GeneralService/GeneralService");
const HomeSerivce_1 = require("../ServiceManager/HomeService/HomeSerivce");
const UserSystem_1 = require("../ServiceManager/HomeService/UserAggregate/UserSystem");
const ServiceManager_1 = require("../ServiceManager/ServiceManager");
class InstantiationProcess {
    constructor() { }
    Run(container) {
        this.InstantiateHttpServer(container);
        this.InstantiateService(container);
    }
    InstantiateHttpServer(container) {
        let httpServer = new jackwebutil_1.HttpServer();
        container.Set(jackwebutil_1.HttpServer.name, httpServer);
    }
    InstantiateService(container) {
        let serviceManager = new ServiceManager_1.ServiceManager();
        container.Set(ServiceManager_1.ServiceManager.name, serviceManager);
        let generalService = new GeneralService_1.GeneralService();
        container.Set(GeneralService_1.GeneralService.name, generalService);
        let homeService = new HomeSerivce_1.HomeService();
        container.Set(HomeSerivce_1.HomeService.name, homeService);
        let userSystem = new UserSystem_1.UserSystem();
        container.Set(UserSystem_1.UserSystem.name, userSystem);
    }
}
exports.InstantiationProcess = InstantiationProcess;
