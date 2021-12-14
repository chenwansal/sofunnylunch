"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jackwebutil_1 = require("jackwebutil");
const FoodDao_1 = require("./DB/Dao/Food/FoodDao");
const MenuDao_1 = require("./DB/Dao/Menu/MenuDao");
const HomeMenuCao_1 = require("./Service/Home/Repository/HomeMenuCao");
const AdminService_1 = require("./Service/Admin/AdminService");
const HomeLoadMenuService_1 = require("./Service/Home/Service/HomeLoadMenuService");
const HomeService_1 = require("./Service/Home/Service/HomeService");
const PathHelper_1 = require("./Util/PathHelper");
const AdminAddMenuService_1 = require("./Service/Admin/AdminAddMenuService");
class App {
    static main() {
        PathHelper_1.PathHelper.Init();
        // ==== CTOR ====
        // CTOR HTTP
        let http = new jackwebutil_1.HttpServer();
        // CTOR DAO
        let menuDao = new MenuDao_1.MenuDao();
        let foodDao = new FoodDao_1.FoodDao();
        // CTOR CAO
        let homeMenuCao = new HomeMenuCao_1.HomeMenuCao();
        // CTOR HOME SERVICE
        let homeService = new HomeService_1.HomeService();
        let homeLoadMenuService = new HomeLoadMenuService_1.HomeLoadMenuService();
        // CTOR ADMIN SERVICE
        let adminService = new AdminService_1.AdminService();
        let adminAddMenuService = new AdminAddMenuService_1.AdminAddMenuService();
        // ==== INJECT ====
        // INJECT HOME SERVICE
        homeService.Inject(http);
        homeLoadMenuService.Inject(foodDao, menuDao, homeMenuCao, http);
        // INJECT ADMIN SERVICE
        adminService.Inject(http);
        adminAddMenuService.Inject(menuDao, foodDao, http);
        // ==== INIT ====
        // INIT HTTP
        const viewPath = "/view/";
        http.InitHttpView(9966, PathHelper_1.PathHelper.GetRootDir(), viewPath, viewPath);
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
//# sourceMappingURL=App.js.map