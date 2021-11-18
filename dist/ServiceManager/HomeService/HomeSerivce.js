"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
class HomeService {
    constructor() { }
    Inject(http, userSystem, menuController) {
        this.http = http;
        this.userSystem = userSystem;
        this.menuController = menuController;
    }
    Init() {
        this.http.GetListen("/", (req, res) => {
            res.render("/index.html");
        });
        this.menuController.Init();
    }
}
exports.HomeService = HomeService;
