"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const RequestQueryHelper_1 = require("../../Util/RequestQueryHelper");
class AdminService {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Listening() {
        this.http.GetListen("/admin", (req, res) => {
            let isAdmin = RequestQueryHelper_1.RequestQueryHelper.IsAdministrator(req);
            if (!isAdmin) {
                res.status(500).end();
                return;
            }
            res.render("admin.html");
        });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=AdminService.js.map