import { HttpServer } from "jackwebutil";
import { FoodDao } from "./DB/Dao/Food/FoodDao";
import { MenuDao } from "./DB/Dao/Menu/MenuDao";
import { HomeMenuCao } from "./Service/Home/Repository/HomeMenuCao";
import { AdminService } from "./Service/Admin/AdminService";
import { HomeLoadMenuService } from "./Service/Home/Service/HomeLoadMenuService";
import { HomeService } from "./Service/Home/Service/HomeService";
import { PathHelper } from "./Util/PathHelper";
import { AdminAddMenuService } from "./Service/Admin/AdminAddMenuService";

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

        // CTOR ADMIN SERVICE
        let adminService: AdminService = new AdminService();
        let adminAddMenuService: AdminAddMenuService = new AdminAddMenuService();

        // ==== INJECT ====
        // INJECT HOME SERVICE
        homeService.Inject(http);
        homeLoadMenuService.Inject(foodDao, menuDao, homeMenuCao, http);

        // INJECT ADMIN SERVICE
        adminService.Inject(http);
        adminAddMenuService.Inject(menuDao, foodDao, http);

        // ==== INIT ====
        // INIT HTTP
        const viewPath: string = "/view/";
        http.InitHttpView(9966, PathHelper.GetRootDir(), viewPath, viewPath);

        // INIT DAO
        menuDao.Init();
        foodDao.Init();

        // INIT HOME SERVICE
        homeService.Init();
        homeLoadMenuService.Init();

        // INIT ADMIN SERVICE
        adminService.Init();
        adminAddMenuService.Init();

        // ==== RUN ====
        http.Start();
    
    }

}

App.main();