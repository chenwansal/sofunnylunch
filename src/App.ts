import { HttpServer } from "jackwebutil";
import { FoodDao } from "./DB/Dao/Food/FoodDao";
import { MenuDao } from "./DB/Dao/Menu/MenuDao";
import { HomeMenuCao } from "./Service/Home/Repository/HomeMenuCao";
import { HomeLoadMenuService } from "./Service/Home/Service/HomeLoadMenuService";
import { HomeService } from "./Service/Home/Service/HomeService";

class App {

    static main() {

        // ==== CTOR ====
        // CTOR HTTP
        let http: HttpServer = new HttpServer();

        // CTOR DAO
        let menuDao: MenuDao = new MenuDao();
        let foodDao: FoodDao = new FoodDao();

        // CTOR CAO
        let homeMenuCao: HomeMenuCao = new HomeMenuCao();

        // CTOR HOME SERVICE
        let homeService: HomeService = new HomeService();
        let homeLoadMenuService: HomeLoadMenuService = new HomeLoadMenuService();

        // ==== INJECT ====
        // INJECT HOME SERVICE
        homeService.Inject(http);
        homeLoadMenuService.Inject(foodDao, menuDao, homeMenuCao, http);

        // ==== INIT ====
        // INIT HTTP
        const viewPath: string = "../view/";
        http.InitHttpView(9966, __dirname, viewPath, viewPath);

        // INIT DAO
        menuDao.Init();
        foodDao.Init();

        // INIT HOME SERVICE
        homeService.Init();
        homeLoadMenuService.Init();

        // ==== RUN ====
        http.Start();
    
    }

}

App.main();