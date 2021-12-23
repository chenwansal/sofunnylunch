import { HttpServer } from "jackwebutil";
import { FoodDao } from "../../DB/Dao/Food/FoodDao";
import { MenuDao } from "../../DB/Dao/Menu/MenuDao";
import { MenuTable } from "../../DB/Table/MenuTable";

export class AdminAddMenuService {

    menuDao: MenuDao;
    foodDao: FoodDao;
    http: HttpServer;

    constructor() { }

    Inject(menuDao: MenuDao, foodDao: FoodDao, http: HttpServer): void {
        this.menuDao = menuDao;
        this.foodDao = foodDao;
        this.http = http;
    }

    Init() {

        type NewMenu = {
            date: string,
            foodArr: string[]
        }

        this.http.PostListen("/AddMenu", (req, res) => {

            let foodIdArr: number[] = [];

            let newMenu: NewMenu = req.body.data;
            for (let i = 0; i < newMenu.foodArr.length; i += 1) {
                let foodName = newMenu.foodArr[i];
                let insertedFood = this.foodDao.AddFoodWithName(foodName);
                foodIdArr.push(insertedFood.id);
            }

            let menu: MenuTable = new MenuTable();
            menu.yyyymmdd = newMenu.date;
            menu.foodIdArr = foodIdArr;
            this.menuDao.AddMenu(menu);

            console.log("收到录入菜单: ", newMenu);

        });

    }

}