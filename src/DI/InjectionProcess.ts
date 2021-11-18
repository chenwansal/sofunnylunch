import { HttpServer } from "jackwebutil";
import { UserSystem } from "../ServiceManager/HomeService/UserAggregate/UserSystem";
import { HomeService } from "../ServiceManager/HomeService/HomeSerivce";
import { ServiceManager } from "../ServiceManager/ServiceManager";
import { Container } from "./Container";
import { HomeMenuController } from "../ServiceManager/HomeService/MenuAggregate/HomeMenuController";
import { MenuRepository } from "../ServiceManager/HomeService/MenuAggregate/Repository/MenuRepository";
import { MenuFactory } from "../ServiceManager/HomeService/MenuAggregate/Factory/MenuFactory";
import { IFoodDao } from "../DB/Dao/Food/IFoodDao";
import { IMenuDao } from "../DB/Dao/Menu/IMenuDao";

export class InjectionProcess {

    constructor() { }

    Run(container: Container) {
        this.InjectServiceManager(container);
    }

    private InjectServiceManager(container: Container) {

        let foodDao: IFoodDao = container.Get("IFoodDao");
        let menuDao: IMenuDao = container.Get("IMenuDao");

        let serviceManager: ServiceManager = container.Get(ServiceManager.name);

        let httpServer: HttpServer = container.Get(HttpServer.name);

        let homeService: HomeService = container.Get(HomeService.name);
        let homeMenuController: HomeMenuController = container.Get(HomeMenuController.name);

        let menuFactory: MenuFactory = container.Get(MenuFactory.name);
        let menuRepository: MenuRepository = container.Get(MenuRepository.name);

        let userSystem: UserSystem = container.Get(UserSystem.name);

        serviceManager.Inject(httpServer, homeService);
        homeService.Inject(httpServer, userSystem, homeMenuController);
        homeMenuController.Inject(httpServer, menuFactory, menuRepository);
        menuFactory.Inject(foodDao, menuDao);

    }

}