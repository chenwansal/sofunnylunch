import { HttpServer } from "jackwebutil";
import { FoodDao } from "../../../DB/Dao/Food/FoodDao";
import { MenuDao } from "../../../DB/Dao/Menu/MenuDao";
import { FoodTable } from "../../../DB/Table/FoodTable";
import { MenuTable } from "../../../DB/Table/MenuTable";
import { MenuFactory } from "./Factory/MenuFactory";
import { MenuRepository } from "./Repository/MenuRepository";
import { MenuDto } from "./Response/MenuDto";

export class HomeMenuController {

    http: HttpServer;
    menuFactory: MenuFactory;
    menuRepository: MenuRepository;

    constructor() {}

    Inject(http: HttpServer, menuFactory: MenuFactory, menuRepository: MenuRepository): void {
        this.http = http;
        this.menuFactory = menuFactory;
        this.menuRepository = menuRepository;
    }

    Init(): void {

        this.CreateTodayMenu();

        this.http.PostListen("/GetMenu", (req, res) => {

            let menu = this.menuRepository.GetCurrentMenu();

            res.json(menu.GetTodayMenuDto());

        });

    }

    CreateTodayMenu(): void {
        let menu = this.menuFactory.CreateMenuEntity();
        this.menuRepository.SetCurrentMenu(menu);
    }

}