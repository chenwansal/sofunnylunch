import { HttpServer } from "jackwebutil";
import { PathHelper } from "../../Util/PathHelper";

export class AdminService {

    http: HttpServer;

    constructor() { }

    Inject(http: HttpServer): void {
        this.http = http;
    }

    Init(): void {
        this.http.GetListen("/admin", (req, res) => {
            res.render("admin.html");
        });
    }
}