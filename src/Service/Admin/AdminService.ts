import { HttpServer } from "jackwebutil";
import { PathHelper } from "../../Util/PathHelper";
import { RequestQueryHelper } from "../../Util/RequestQueryHelper";

export class AdminService {

    http: HttpServer;

    constructor() { }

    Inject(http: HttpServer): void {
        this.http = http;
    }

    Listening(): void {
        this.http.GetListen("/admin", (req, res) => {

            let isAdmin = RequestQueryHelper.IsAdministrator(req);
            if (!isAdmin) {
                res.status(500).end();
                return;
            }
            
            res.render("admin.html");

        });
    }
}