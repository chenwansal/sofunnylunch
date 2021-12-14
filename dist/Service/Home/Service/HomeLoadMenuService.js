"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeLoadMenuService = void 0;
class HomeLoadMenuService {
    constructor() { }
    Inject(foodDao, menuDao, homeMenuCao, http) {
        this.foodDao = foodDao;
        this.menuDao = menuDao;
        this.homeMenuCao = homeMenuCao;
        this.http = http;
    }
    Init() {
        this.http.PostListen("/GetMenu", (req, res) => {
            let dto = this.GetTodayMenuDto();
            console.log(dto);
            res.json(dto);
        });
    }
    GetTodayMenuDto() {
        let dto = this.homeMenuCao.GetCachedMenuDto();
        if (dto == null) {
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
            this.homeMenuCao.SetCachedMenuDto(dto);
        }
        return dto;
    }
}
exports.HomeLoadMenuService = HomeLoadMenuService;
//# sourceMappingURL=HomeLoadMenuService.js.map