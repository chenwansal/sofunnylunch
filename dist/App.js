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
const CommentDao_1 = require("./DB/Dao/Comment/CommentDao");
const HomeResetTodayMenuService_1 = require("./Service/Home/Service/HomeResetTodayMenuService");
const AdminGetAllCommentService_1 = require("./Service/Admin/AdminGetAllCommentService");
const Daos_1 = require("./DB/Daos");
const PORT = 9966;
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
            idTable.commentId = 0;
            JsonVisitor_1.JsonVisitor.WriteToFile(PathHelper_1.PathHelper.GetIdRecordFilePath(), idTable);
            console.log("创建表ID记录文件");
        }
        else {
            console.log("读取表ID记录文件");
        }
        FoodDao_1.FoodDao.currentId = idTable.foodId;
        MenuDao_1.MenuDao.currentId = idTable.menuId;
        CommentDao_1.CommentDao.currentId = idTable.commentId;
        console.log("初始化表ID");
        // ==== CTOR ====
        // CTOR HTTP
        let http = new jackwebutil_1.HttpServer();
        // CTOR DAO
        let menuDao = new MenuDao_1.MenuDao();
        let foodDao = new FoodDao_1.FoodDao();
        let commentDao = new CommentDao_1.CommentDao();
        // CTOR CAO
        let homeMenuCao = new HomeMenuCao_1.HomeMenuCao();
        // CTOR HOME SERVICE
        let homeService = new HomeService_1.HomeService();
        let homeLoadMenuService = new HomeLoadMenuService_1.HomeLoadMenuService();
        let homeCommentService = new HomeCommentService_1.HomeCommentService();
        let homeResetTodayMenuService = new HomeResetTodayMenuService_1.HomeResetTodayMenuService();
        // CTOR ADMIN SERVICE
        let adminService = new AdminService_1.AdminService();
        let adminAddMenuService = new AdminAddMenuService_1.AdminAddMenuService();
        let adminGetAllCommentService = new AdminGetAllCommentService_1.AdminGetAllCommentService();
        // ==== INJECT ====
        // INJECT HOME SERVICE
        homeService.Inject(http);
        homeLoadMenuService.Inject(foodDao, menuDao, homeMenuCao, http);
        homeCommentService.Inject(http, commentDao);
        homeResetTodayMenuService.Inject(menuDao);
        // INJECT ADMIN SERVICE
        adminService.Inject(http);
        adminAddMenuService.Inject(menuDao, foodDao, http);
        adminGetAllCommentService.Inject(http, foodDao, commentDao);
        Daos_1.Daos.Inject(menuDao, foodDao, commentDao);
        // ==== INIT ====
        // INIT HTTP
        const viewPath = "/view/";
        http.InitHttpView(PORT, PathHelper_1.PathHelper.GetRootDir(), viewPath, viewPath);
        // INIT DAO
        menuDao.Init();
        foodDao.Init();
        commentDao.Init();
        // INIT HOME SERVICE
        homeService.Init();
        homeLoadMenuService.Init();
        homeCommentService.Init();
        homeResetTodayMenuService.Init();
        // INIT ADMIN SERVICE
        adminService.Listening();
        adminAddMenuService.Listening();
        adminGetAllCommentService.Listening();
        // ==== RUN ====
        http.Start();
        setInterval(() => {
            let date = new Date();
            console.log(date.getDay());
        }, 1000);
    }
}
App.main();
//# sourceMappingURL=App.js.map