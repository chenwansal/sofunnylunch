import { HttpServer } from "jackwebutil";
import { GeneralService } from "../ServiceManager/GeneralService/GeneralService";
import { HomeService } from "../ServiceManager/HomeService/HomeSerivce";
import { UserSystem } from "../ServiceManager/HomeService/UserAggregate/UserSystem";
import { ServiceManager } from "../ServiceManager/ServiceManager";
import { Container } from "./Container";

export class InstantiationProcess {

    constructor() { }

    Run(container: Container) {
        this.InstantiateHttpServer(container);
        this.InstantiateService(container)
    }

    private InstantiateHttpServer(container: Container) {

        let httpServer: HttpServer = new HttpServer();
        container.Set(HttpServer.name, httpServer);

    }

    private InstantiateService(container: Container) {

        let serviceManager: ServiceManager = new ServiceManager();
        container.Set(ServiceManager.name, serviceManager);

        let generalService: GeneralService = new GeneralService();
        container.Set(GeneralService.name, generalService);

        let homeService: HomeService = new HomeService();
        container.Set(HomeService.name, homeService);

        let userSystem: UserSystem = new UserSystem();
        container.Set(UserSystem.name, userSystem);

    }

}