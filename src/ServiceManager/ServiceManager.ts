import { HttpServer } from "jackwebutil";
import { IContainerInstance } from "../Audit/IContainerInstance";
import { HomeService } from "./HomeService/HomeSerivce";

export class ServiceManager implements IContainerInstance {

    http: HttpServer;
    homeService: HomeService;

    constructor() {
        this.http = null;
    }

    Ctor(http: HttpServer, homeService: HomeService) {
        this.http = http;
        this.homeService = homeService;
    }

    Init() {

        this.homeService.Init();

    }

    StartService() {
        this.http.Start();
    }

}