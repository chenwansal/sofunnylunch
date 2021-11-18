"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializationProcess = void 0;
const jackwebutil_1 = require("jackwebutil");
const ServiceManager_1 = require("../ServiceManager/ServiceManager");
class InitializationProcess {
    constructor() { }
    Run(container) {
        this.InitHttpServer(container);
        this.InitDB(container);
        this.InitServiceManager(container);
    }
    InitHttpServer(container) {
        let httpServer = container.Get(jackwebutil_1.HttpServer.name);
        httpServer.InitHttpView(9966, __dirname, "../../view", "../../view");
    }
    InitDB(container) {
        let menuDao = container.Get("IMenuDao");
        menuDao.CachingAllMenu();
        let foodDao = container.Get("IFoodDao");
        foodDao.CachingAllFood();
    }
    InitServiceManager(container) {
        let serviceManager = container.Get(ServiceManager_1.ServiceManager.name);
        serviceManager.Init();
    }
}
exports.InitializationProcess = InitializationProcess;
