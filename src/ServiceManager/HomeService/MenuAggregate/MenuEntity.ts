import { IFoodDao } from "../../../DB/Dao/Food/IFoodDao";
import { IMenuDao } from "../../../DB/Dao/Menu/IMenuDao";
import { FoodTable } from "../../../DB/Table/FoodTable";
import { MenuTable } from "../../../DB/Table/MenuTable";
import { MenuCacheModel } from "./Model/MenuCacheModel";
import { MenuDto } from "./Response/MenuDto";

export class MenuEntity {

    menuCacheModel: MenuCacheModel;

    foodDao: IFoodDao;
    menuDao: IMenuDao;

    constructor() {
        this.menuCacheModel = new MenuCacheModel();
    }

    Inject(foodDao: IFoodDao, menuDao: IMenuDao) {
        this.foodDao = foodDao;
        this.menuDao = menuDao;
    }

    GetTodayMenuDto(): MenuDto {

        let dto: MenuDto;

        if (this.menuCacheModel.menuDto != null) {

            dto = this.menuCacheModel.menuDto;

        } else {

            let menu: MenuTable = this.menuDao.GetTodayMenu();
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

            this.menuCacheModel.menuDto = dto;

        }

        return dto;

    }

}