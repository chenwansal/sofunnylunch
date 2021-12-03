import { HttpServer } from "jackwebutil";

export class HomeService {

    http: HttpServer;

    constructor() {}

    Inject(http: HttpServer): void {
        this.http = http;
    }

    Init(): void {

        this.http.GetListen("/", (req, res) => {
            res.render("/index.html");
        });

        this.http.GetListen("/home", (req, res) => {
            res.render("/index.html");
        });

    }

}