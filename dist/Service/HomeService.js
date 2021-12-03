"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
class HomeService {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Init() {
        this.http.GetListen("/", (req, res) => {
            res.render("/index.html");
        });
    }
}
exports.HomeService = HomeService;
