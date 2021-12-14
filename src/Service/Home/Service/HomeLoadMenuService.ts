import { HttpServer } from "jackwebutil";
import { FoodDao } from "../../../DB/Dao/Food/FoodDao";
import { MenuDao } from "../../../DB/Dao/Menu/MenuDao";
import { FoodTable } from "../../../DB/Table/FoodTable";
import { MenuTable } from "../../../DB/Table/MenuTable";
import { HomeMenuCao } from "../Repository/HomeMenuCao";

export type MenuDto = {

    id: number;
    yyyymmdd: string;
    foodArr: FoodTable[];

}

export class HomeLoadMenuService {

    foodDao: FoodDao;
    menuDao: MenuDao;
    homeMenuCao: HomeMenuCao;
    http: HttpServer;

    constructor() { }

    Inject(foodDao: FoodDao, menuDao: MenuDao, homeMenuCao: HomeMenuCao, http: HttpServer): void {
        this.foodDao = foodDao;
        this.menuDao = menuDao;
        this.homeMenuCao = homeMenuCao;
        this.http = http;
    }

    Init() {

        this.http.PostListen("/GetMenu", (req, res) => {
            let dto = this.GetTodayMenuDto();
            if (!dto) {
                return;
            }
            res.json(dto);
        });

    }

    private GetTodayMenuDto(): MenuDto {

        let dto: MenuDto = this.homeMenuCao.GetCachedMenuDto();

        if (dto == null) {

            let menu: MenuTable = this.menuDao.GetTodayMenu();
            if (!menu) {
                console.log("不存在今日菜单");
                return null;
            }

            let foodArr: FoodTable[] = [];
            for (let i = 0; i < menu.foodIdArr.length; i += 1) {
                let foodId = menu.foodIdArr[i];
                let food = this.foodDao.GetFood(foodId);
                foodArr.push(food);
            }

            dto = {
                id: menu.id,
                yyyymmdd: menu.yyyymmdd,
                foodArr: foodArr
            }

            this.homeMenuCao.SetCachedMenuDto(dto);

        }

        return dto;

    }

}