"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAddMenuService = void 0;
const MenuTable_1 = require("../../DB/Table/MenuTable");
class AdminAddMenuService {
    constructor() { }
    Inject(menuDao, foodDao, http) {
        this.menuDao = menuDao;
        this.foodDao = foodDao;
        this.http = http;
    }
    Init() {
        this.http.PostListen("/AddMenu", (req, res) => {
            let foodIdArr = [];
            let newMenu = req.body.data;
            for (let i = 0; i < newMenu.foodArr.length; i += 1) {
                let foodName = newMenu.foodArr[i];
                let insertedFood = this.foodDao.AddFoodWithName(foodName);
                foodIdArr.push(insertedFood.id);
            }
            let menu = new MenuTable_1.MenuTable();
            menu.yyyymmdd = newMenu.date;
            menu.foodIdArr = foodIdArr;
            this.menuDao.AddMenu(menu);
        });
    }
}
exports.AdminAddMenuService = AdminAddMenuService;
//# sourceMappingURL=AdminAddMenuService.js.map