import { HttpServer } from "jackwebutil";
import { PathHelper } from "../../Util/PathHelper";

export class AdminService {

    http: HttpServer;

    constructor() { }

    Inject(http: HttpServer): void {
        this.http = http;
    }

    Listening(): void {
        this.http.GetListen("/admin", (req, res) => {
            let query = req.query;
            if (!query) {
                res.status(500).end();
                return;
            }

            let user = query.user;
            let pwd = query.pwd;
            if (user === "cw" && pwd === "123") {
                res.render("admin.html");
            } else {
                res.status(500).end();
            }

        });
    }
}