"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeCommentService = void 0;
class HomeCommentService {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Init() {
        this.http.PostListen("/Comment", (req, res) => {
            let json = req.body.data;
            if (!json) {
                res.json({
                    state: -1
                });
                return;
            }
            console.log(json);
            console.log(req.ip);
        });
    }
}
exports.HomeCommentService = HomeCommentService;
//# sourceMappingURL=HomeCommentService.js.map