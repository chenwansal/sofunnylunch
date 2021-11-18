"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuFactory = void 0;
const MenuEntity_1 = require("../MenuEntity");
class MenuFactory {
    Inject(foodDao, menuDao) {
        this.foodDao = foodDao;
        this.menuDao = menuDao;
    }
    CreateMenuEntity() {
        let entity = new MenuEntity_1.MenuEntity();
        entity.Inject(this.foodDao, this.menuDao);
        return entity;
    }
}
exports.MenuFactory = MenuFactory;
