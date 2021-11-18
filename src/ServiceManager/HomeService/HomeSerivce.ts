import { HttpServer } from "jackwebutil";
import { HomeMenuController } from "./MenuAggregate/HomeMenuController";
import { UserSystem } from "./UserAggregate/UserSystem";

export class HomeService {

    http: HttpServer;
    userSystem: UserSystem;
    menuController: HomeMenuController;

    constructor() { }

    Inject(http: HttpServer, userSystem: UserSystem, menuController: HomeMenuController) {
        this.http = http;
        this.userSystem = userSystem;
        this.menuController = menuController;
    }

    Init() {

        this.http.GetListen("/", (req, res) => {
            res.render("/index.html");
        });

        this.menuController.Init();

    }

}