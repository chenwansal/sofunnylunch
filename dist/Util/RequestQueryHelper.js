"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQueryHelper = void 0;
class RequestQueryHelper {
    static IsAdministrator(req) {
        let query = req.query;
        if (!query) {
            return false;
        }
        let user = query.user;
        let pwd = query.pwd;
        if (user === "cw" && pwd === "123") {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.RequestQueryHelper = RequestQueryHelper;
//# sourceMappingURL=RequestQueryHelper.js.map