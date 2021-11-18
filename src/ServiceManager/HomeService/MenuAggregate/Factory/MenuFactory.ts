import { IFoodDao } from "../../../../DB/Dao/Food/IFoodDao";
import { IMenuDao } from "../../../../DB/Dao/Menu/IMenuDao";
import { MenuEntity } from "../MenuEntity";

export class MenuFactory {

    foodDao: IFoodDao;
    menuDao: IMenuDao;

    Inject(foodDao: IFoodDao, menuDao: IMenuDao) {
        this.foodDao = foodDao;
        this.menuDao = menuDao;
    }

    CreateMenuEntity(): MenuEntity {
        let entity: MenuEntity = new MenuEntity();
        entity.Inject(this.foodDao, this.menuDao);
        return entity;
    }

}