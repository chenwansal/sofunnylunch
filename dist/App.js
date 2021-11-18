"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuTable_1 = require("./DB/Table/MenuTable");
const Container_1 = require("./DI/Container");
const InitializationProcess_1 = require("./DI/InitializationProcess");
const InjectionProcess_1 = require("./DI/InjectionProcess");
const InstantiationProcess_1 = require("./DI/InstantiationProcess");
const ServiceManager_1 = require("./ServiceManager/ServiceManager");
const DateHelper_1 = require("./Util/DateHelper");
const PathHelper_1 = require("./Util/PathHelper");
class App {
    static main() {
        PathHelper_1.PathHelper.Init();
        let container = new Container_1.Container();
        // ---- DI ----
        let instantiation = new InstantiationProcess_1.InstantiationProcess();
        instantiation.Run(container);
        let injection = new InjectionProcess_1.InjectionProcess();
        injection.Run(container);
        // TODO 菜品
        let foodDao = container.Get("IFoodDao");
        let foodArr = [
            { id: 1, name: "红烧鱼", supplier: "老A" },
            { id: 2, name: "黄花菜", supplier: "厨禾秀" },
            { id: 3, name: "炒蛋", supplier: "小C" },
        ];
        foodDao.AddFoods(foodArr);
        // TODO 菜单
        let menuDao = container.Get("IMenuDao");
        let menu = new MenuTable_1.MenuTable();
        menu.id = 1;
        menu.yyyymmdd = DateHelper_1.DateHelper.GetYYYYMMDD();
        menu.foodIdArr = [1, 2, 3];
        menuDao.AddMenu(menu);
        // ---- INIT ----
        let initilization = new InitializationProcess_1.InitializationProcess();
        initilization.Run(container);
        // ---- RUN ----
        let serviceManager = container.Get(ServiceManager_1.ServiceManager.name);
        serviceManager.StartService();
    }
}
App.main();
