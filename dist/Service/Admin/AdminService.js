"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
class AdminService {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Listening() {
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
            }
            else {
                res.status(500).end();
            }
        });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=AdminService.js.map