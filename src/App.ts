import { HttpServer } from "jackwebutil";
import { FoodDao } from "./DB/Dao/Food/FoodDao";
import { MenuDao } from "./DB/Dao/Menu/MenuDao";
import { HomeMenuCao } from "./Service/Home/Repository/HomeMenuCao";
import { AdminService } from "./Service/Admin/AdminService";
import { HomeLoadMenuService } from "./Service/Home/Service/HomeLoadMenuService";
import { HomeService } from "./Service/Home/Service/HomeService";
import { PathHelper } from "./Util/PathHelper";
import { AdminAddMenuService } from "./Service/Admin/AdminAddMenuService";
import { JsonVisitor } from "./DB/JsonVisitor";
import { IdRecordTable } from "./DB/Table/IdRecordTable";
import { HomeCommentService } from "./Service/Home/Service/HomeCommentService";
import { CommentDao } from "./DB/Dao/Comment/CommentDao";
import { HomeResetTodayMenuService } from "./Service/Home/Service/HomeResetTodayMenuService";
import { AdminGetAllCommentService } from "./Service/Admin/AdminGetAllCommentService";
import { Daos } from "./DB/Daos";

const PORT = 9966;

class App {

    static main() {

        // 初始化路径
        PathHelper.Init();

        // 初始化表 ID
        let idTable: IdRecordTable = JsonVisitor.ReadJsonFromFile<IdRecordTable>(PathHelper.GetIdRecordFilePath());
        if (!idTable) {
            idTable = new IdRecordTable();
            idTable.foodId = 0;
            idTable.menuId = 0;
            idTable.commentId = 0;
            JsonVisitor.WriteToFile(PathHelper.GetIdRecordFilePath(), idTable);
            console.log("创建表ID记录文件");
        } else {
            console.log("读取表ID记录文件");
        }
        FoodDao.currentId = idTable.foodId;
        MenuDao.currentId = idTable.menuId;
        CommentDao.currentId = idTable.commentId;
        console.log("初始化表ID");

        // ==== CTOR ====
        // CTOR HTTP
        let http: HttpServer = new HttpServer();

        // CTOR DAO
        let menuDao: MenuDao = new MenuDao();
        let foodDao: FoodDao = new FoodDao();
        let commentDao: CommentDao = new CommentDao();

        // CTOR CAO
        let homeMenuCao: HomeMenuCao = new HomeMenuCao();

        // CTOR HOME SERVICE
        let homeService: HomeService = new HomeService();
        let homeLoadMenuService: HomeLoadMenuService = new HomeLoadMenuService();
        let homeCommentService: HomeCommentService = new HomeCommentService();
        let homeResetTodayMenuService : HomeResetTodayMenuService = new HomeResetTodayMenuService();

        // CTOR ADMIN SERVICE
        let adminService: AdminService = new AdminService();
        let adminAddMenuService: AdminAddMenuService = new AdminAddMenuService();
        let adminGetAllCommentService: AdminGetAllCommentService = new AdminGetAllCommentService();

        // ==== INJECT ====
        // INJECT HOME SERVICE
        homeService.Inject(http);
        homeLoadMenuService.Inject(foodDao, menuDao, homeMenuCao, http);
        homeCommentService.Inject(http, commentDao);
        homeResetTodayMenuService.Inject(menuDao, homeMenuCao);

        // INJECT ADMIN SERVICE
        adminService.Inject(http);
        adminAddMenuService.Inject(menuDao, foodDao, http);
        adminGetAllCommentService.Inject(http, foodDao, commentDao);

        Daos.Inject(menuDao, foodDao, commentDao);

        // ==== INIT ====
        // INIT HTTP
        const viewPath: string = "/view/";
        http.InitHttpView(PORT, PathHelper.GetRootDir(), viewPath, viewPath);

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

    }

}

App.main();