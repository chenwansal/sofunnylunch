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
const JsonVisitor_1 = require("./DB/JsonVisitor");
const IdRecordTable_1 = require("./DB/Table/IdRecordTable");
const HomeCommentService_1 = require("./Service/Home/Service/HomeCommentService");
class App {
    static main() {
        // 初始化路径
        PathHelper_1.PathHelper.Init();
        // 初始化表 ID
        let idTable = JsonVisitor_1.JsonVisitor.ReadJsonFromFile(PathHelper_1.PathHelper.GetIdRecordFilePath());
        if (!idTable) {
            idTable = new IdRecordTable_1.IdRecordTable();
            idTable.foodId = 0;
            idTable.menuId = 0;
            JsonVisitor_1.JsonVisitor.WriteToFile(PathHelper_1.PathHelper.GetIdRecordFilePath(), idTable);
            console.log("创建表ID记录文件");
        }
        else {
            console.log("读取表ID记录文件");
        }
        FoodDao_1.FoodDao.currentId = idTable.foodId;
        MenuDao_1.MenuDao.currentId = idTable.menuId;
        console.log("初始化表ID");
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
        let homeCommentService = new HomeCommentService_1.HomeCommentService();
        // CTOR ADMIN SERVICE
        let adminService = new AdminService_1.AdminService();
        let adminAddMenuService = new AdminAddMenuService_1.AdminAddMenuService();
        // ==== INJECT ====
        // INJECT HOME SERVICE
        homeService.Inject(http);
        homeLoadMenuService.Inject(foodDao, menuDao, homeMenuCao, http);
        homeCommentService.Inject(http);
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
        homeCommentService.Init();
        // INIT ADMIN SERVICE
        adminService.Init();
        adminAddMenuService.Init();
        // ==== RUN ====
        http.Start();
    }
}
App.main();
//# sourceMappingURL=App.js.map