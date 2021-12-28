"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeResetTodayMenuService = void 0;
class HomeResetTodayMenuService {
    constructor() {
        this.lastDay = -1;
    }
    Inject(menuDao) {
        this.menuDao = menuDao;
    }
    Init() {
        setInterval(() => {
            let today = new Date().getDay();
            if (this.lastDay != today) {
                this.menuDao.ResetTodayMenu();
                this.lastDay = today;
            }
        }, 1000 * 60);
    }
}
exports.HomeResetTodayMenuService = HomeResetTodayMenuService;
//# sourceMappingURL=HomeResetTodayMenuService.js.map