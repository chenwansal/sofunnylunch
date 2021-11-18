"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionProcess = void 0;
const jackwebutil_1 = require("jackwebutil");
const UserSystem_1 = require("../ServiceManager/HomeService/UserAggregate/UserSystem");
const HomeSerivce_1 = require("../ServiceManager/HomeService/HomeSerivce");
const ServiceManager_1 = require("../ServiceManager/ServiceManager");
const HomeMenuController_1 = require("../ServiceManager/HomeService/MenuAggregate/HomeMenuController");
const MenuRepository_1 = require("../ServiceManager/HomeService/MenuAggregate/Repository/MenuRepository");
const MenuFactory_1 = require("../ServiceManager/HomeService/MenuAggregate/Factory/MenuFactory");
class InjectionProcess {
    constructor() { }
    Run(container) {
        this.InjectServiceManager(container);
    }
    InjectServiceManager(container) {
        let foodDao = container.Get("IFoodDao");
        let menuDao = container.Get("IMenuDao");
        let serviceManager = container.Get(ServiceManager_1.ServiceManager.name);
        let httpServer = container.Get(jackwebutil_1.HttpServer.name);
        let homeService = container.Get(HomeSerivce_1.HomeService.name);
        let homeMenuController = container.Get(HomeMenuController_1.HomeMenuController.name);
        let menuFactory = container.Get(MenuFactory_1.MenuFactory.name);
        let menuRepository = container.Get(MenuRepository_1.MenuRepository.name);
        let userSystem = container.Get(UserSystem_1.UserSystem.name);
        serviceManager.Inject(httpServer, homeService);
        homeService.Inject(httpServer, userSystem, homeMenuController);
        homeMenuController.Inject(httpServer, menuFactory, menuRepository);
        menuFactory.Inject(foodDao, menuDao);
    }
}
exports.InjectionProcess = InjectionProcess;
