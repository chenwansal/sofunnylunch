"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
class AdminService {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Init() {
        this.http.GetListen("/admin", (req, res) => {
            res.render("admin.html");
        });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=AdminService.js.map