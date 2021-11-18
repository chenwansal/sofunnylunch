import { HttpServer } from "jackwebutil";
import { IFoodDao } from "../DB/Dao/Food/IFoodDao";
import { IMenuDao } from "../DB/Dao/Menu/IMenuDao";
import { ServiceManager } from "../ServiceManager/ServiceManager";
import { Container } from "./Container";

export class InitializationProcess {

    constructor() {}

    Run(container: Container) {
        this.InitHttpServer(container);
        this.InitDB(container);
        this.InitServiceManager(container);
    }

    private InitHttpServer(container: Container) {

        let httpServer: HttpServer = container.Get(HttpServer.name);

        httpServer.InitHttpView(9966, __dirname, "../../view", "../../view");

    }

    private InitDB(container: Container) {

        let menuDao: IMenuDao = container.Get("IMenuDao");
        menuDao.CachingAllMenu();

        let foodDao: IFoodDao = container.Get("IFoodDao");
        foodDao.CachingAllFood();

    }

    private InitServiceManager(container: Container) {

        let serviceManager: ServiceManager = container.Get(ServiceManager.name);

        serviceManager.Init();

    }

}