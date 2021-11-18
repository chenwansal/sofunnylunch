"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEntity = void 0;
const MenuCacheModel_1 = require("./Model/MenuCacheModel");
class MenuEntity {
    constructor() {
        this.menuCacheModel = new MenuCacheModel_1.MenuCacheModel();
    }
    Inject(foodDao, menuDao) {
        this.foodDao = foodDao;
        this.menuDao = menuDao;
    }
    GetTodayMenuDto() {
        let dto;
        if (this.menuCacheModel.menuDto != null) {
            dto = this.menuCacheModel.menuDto;
        }
        else {
            let menu = this.menuDao.GetTodayMenu();
            let foodArr = [];
            for (let i = 0; i < menu.foodIdArr.length; i += 1) {
                let foodId = menu.foodIdArr[i];
                let food = this.foodDao.GetFood(foodId);
                foodArr.push(food);
            }
            dto = {
                id: menu.id,
                yyyymmdd: menu.yyyymmdd,
                foodArr: foodArr
            };
            this.menuCacheModel.menuDto = dto;
        }
        return dto;
    }
}
exports.MenuEntity = MenuEntity;
