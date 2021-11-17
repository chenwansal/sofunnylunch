import { HttpServer } from "jackwebutil";
import { GeneralService } from "../GeneralService/GeneralService";
import { UserSystem } from "./UserAggregate/UserSystem";

export class HomeService {

    http: HttpServer;
    userSystem: UserSystem;
    generalService: GeneralService;

    constructor() { }

    Ctor(http: HttpServer, userSystem: UserSystem, generalService: GeneralService) {
        this.http = http;
        this.userSystem = userSystem;
        this.generalService = generalService;
    }

    Init() {

        this.http.GetListen("/", (req, res) => {
            res.render("/index.html");
        });

        this.http.PostListen("/GetDate", (req, res) => {
            res.json({date: this.generalService.GetDate()})
        });

    }

}