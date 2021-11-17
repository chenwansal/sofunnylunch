import { HttpServer } from "jackwebutil";
import { ServiceManager } from "../ServiceManager/ServiceManager";
import { Container } from "./Container";

export class InitializationProcess {

    constructor() {}

    Run(container: Container) {
        this.InitHttpServer(container);
        this.InitServiceManager(container);
    }

    private InitHttpServer(container: Container) {

        let httpServer: HttpServer = container.Get(HttpServer.name);

        httpServer.InitHttpView(9966, __dirname, "../../view", "../../view");

    }

    private InitServiceManager(container: Container) {

        let serviceManager: ServiceManager = container.Get(ServiceManager.name);

        serviceManager.Init();

    }

}