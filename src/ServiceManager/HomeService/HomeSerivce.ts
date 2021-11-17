import { HttpServer } from "jackwebutil";
import { UserSystem } from "./UserAggregate/UserSystem";

export class HomeService {

    http: HttpServer;
    userSystem: UserSystem;

    constructor() {}

    Ctor(http: HttpServer, userSystem: UserSystem) {
        this.http = http;
        this.userSystem = userSystem;
    }

    Init() {

        this.http.GetListen("/", (req, res) => {
            res.render("/index.html")
        });
        
    }

}