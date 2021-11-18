"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeMenuController = void 0;
class HomeMenuController {
    constructor() { }
    Inject(http, foodDao, menuDao) {
        this.http = http;
        this.foodDao = foodDao;
        this.menuDao = menuDao;
    }
    Init() {
        this.http.PostListen("/GetMenu", (req, res) => {
            let menu = this.menuDao.GetTodayMenu();
            let foodArr = [];
            for (let i = 0; i < menu.foodIdArr.length; i += 1) {
                let foodId = menu.foodIdArr[i];
                let food = this.foodDao.GetFood(foodId);
                foodArr.push(food);
            }
            let dto = {
                id: menu.id,
                yyyymmdd: menu.yyyymmdd,
                foodArr: foodArr
            };
            res.json(dto);
        });
    }
}
exports.HomeMenuController = HomeMenuController;
