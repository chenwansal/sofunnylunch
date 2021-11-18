"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeMenuController = void 0;
class HomeMenuController {
    constructor() { }
    Inject(http, menuFactory, menuRepository) {
        this.http = http;
        this.menuFactory = menuFactory;
        this.menuRepository = menuRepository;
    }
    Init() {
        this.CreateTodayMenu();
        this.http.PostListen("/GetMenu", (req, res) => {
            let menu = this.menuRepository.GetCurrentMenu();
            res.json(menu.GetTodayMenuDto());
        });
    }
    CreateTodayMenu() {
        let menu = this.menuFactory.CreateMenuEntity();
        this.menuRepository.SetCurrentMenu(menu);
    }
}
exports.HomeMenuController = HomeMenuController;
