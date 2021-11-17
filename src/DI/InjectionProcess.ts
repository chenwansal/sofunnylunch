import { HttpServer } from "jackwebutil";
import { UserSystem } from "../ServiceManager/HomeService/UserAggregate/UserSystem";
import { HomeService } from "../ServiceManager/HomeService/HomeSerivce";
import { ServiceManager } from "../ServiceManager/ServiceManager";
import { Container } from "./Container";

export class InjectionProcess {

    constructor() { }

    Run(container: Container) {
        this.InjectServiceManager(container);
    }

    private InjectServiceManager(container: Container) {

        let serviceManager: ServiceManager = container.Get(ServiceManager.name);

        let httpServer: HttpServer = container.Get(HttpServer.name);

        let homeService: HomeService = container.Get(HomeService.name);
        let userSystem: UserSystem = container.Get(UserSystem.name);

        serviceManager.Ctor(httpServer, homeService);
        homeService.Ctor(httpServer, userSystem);

    }

}