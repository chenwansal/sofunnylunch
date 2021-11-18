"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantiationProcess = void 0;
const jackwebutil_1 = require("jackwebutil");
const FoodDao_1 = require("../DB/Dao/Food/FoodDao");
const MenuDao_1 = require("../DB/Dao/Menu/MenuDao");
const HomeMenuController_1 = require("../ServiceManager/HomeService/MenuAggregate/HomeMenuController");
const HomeSerivce_1 = require("../ServiceManager/HomeService/HomeSerivce");
const UserSystem_1 = require("../ServiceManager/HomeService/UserAggregate/UserSystem");
const ServiceManager_1 = require("../ServiceManager/ServiceManager");
const MenuRepository_1 = require("../ServiceManager/HomeService/MenuAggregate/Repository/MenuRepository");
const MenuFactory_1 = require("../ServiceManager/HomeService/MenuAggregate/Factory/MenuFactory");
class InstantiationProcess {
    constructor() { }
    Run(container) {
        this.InstantiateHttpServer(container);
        this.InstantiateDB(container);
        this.InstantiateService(container);
    }
    InstantiateHttpServer(container) {
        let httpServer = new jackwebutil_1.HttpServer();
        container.Set(jackwebutil_1.HttpServer.name, httpServer);
    }
    InstantiateDB(container) {
        let menuDao = new MenuDao_1.MenuDao();
        container.Set("IMenuDao", menuDao);
        let foodDao = new FoodDao_1.FoodDao();
        container.Set("IFoodDao", foodDao);
    }
    InstantiateService(container) {
        let serviceManager = new ServiceManager_1.ServiceManager();
        container.Set(ServiceManager_1.ServiceManager.name, serviceManager);
        let homeService = new HomeSerivce_1.HomeService();
        container.Set(HomeSerivce_1.HomeService.name, homeService);
        let homeMenuController = new HomeMenuController_1.HomeMenuController();
        container.Set(HomeMenuController_1.HomeMenuController.name, homeMenuController);
        let menuFactory = new MenuFactory_1.MenuFactory();
        container.Set(MenuFactory_1.MenuFactory.name, menuFactory);
        let menuRepository = new MenuRepository_1.MenuRepository();
        container.Set(MenuRepository_1.MenuRepository.name, menuRepository);
        let userSystem = new UserSystem_1.UserSystem();
        container.Set(UserSystem_1.UserSystem.name, userSystem);
    }
}
exports.InstantiationProcess = InstantiationProcess;
