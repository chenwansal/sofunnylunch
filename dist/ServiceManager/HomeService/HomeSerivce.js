"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
class HomeService {
    constructor() { }
    Ctor(http, userSystem, generalService) {
        this.http = http;
        this.userSystem = userSystem;
        this.generalService = generalService;
    }
    Init() {
        this.http.GetListen("/", (req, res) => {
            res.render("/index.html");
        });
        this.http.PostListen("/GetDate", (req, res) => {
            res.json({ date: this.generalService.GetDate() });
        });
    }
}
exports.HomeService = HomeService;
