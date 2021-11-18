import { HttpServer } from "jackwebutil";
import { FoodDao } from "../DB/Dao/Food/FoodDao";
import { MenuDao } from "../DB/Dao/Menu/MenuDao";
import { HomeMenuController } from "../ServiceManager/HomeService/MenuAggregate/HomeMenuController";
import { HomeService } from "../ServiceManager/HomeService/HomeSerivce";
import { UserSystem } from "../ServiceManager/HomeService/UserAggregate/UserSystem";
import { ServiceManager } from "../ServiceManager/ServiceManager";
import { Container } from "./Container";
import { MenuRepository } from "../ServiceManager/HomeService/MenuAggregate/Repository/MenuRepository";
import { MenuFactory } from "../ServiceManager/HomeService/MenuAggregate/Factory/MenuFactory";
import { IFoodDao } from "../DB/Dao/Food/IFoodDao";
import { IMenuDao } from "../DB/Dao/Menu/IMenuDao";

export class InstantiationProcess {

    constructor() { }

    Run(container: Container) {
        this.InstantiateHttpServer(container);
        this.InstantiateDB(container);
        this.InstantiateService(container)
    }

    private InstantiateHttpServer(container: Container) {

        let httpServer: HttpServer = new HttpServer();
        container.Set(HttpServer.name, httpServer);

    }

    private InstantiateDB(container: Container) {

        let menuDao: IMenuDao = new MenuDao();
        container.Set("IMenuDao", menuDao);

        let foodDao: IFoodDao = new FoodDao();
        container.Set("IFoodDao", foodDao);

    }

    private InstantiateService(container: Container) {

        let serviceManager: ServiceManager = new ServiceManager();
        container.Set(ServiceManager.name, serviceManager);

        let homeService: HomeService = new HomeService();
        container.Set(HomeService.name, homeService);

        let homeMenuController: HomeMenuController = new HomeMenuController();
        container.Set(HomeMenuController.name, homeMenuController);

        let menuFactory: MenuFactory = new MenuFactory();
        container.Set(MenuFactory.name, menuFactory);

        let menuRepository: MenuRepository = new MenuRepository();
        container.Set(MenuRepository.name, menuRepository);

        let userSystem: UserSystem = new UserSystem();
        container.Set(UserSystem.name, userSystem);

    }

}