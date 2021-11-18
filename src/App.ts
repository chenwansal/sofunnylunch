import { IFoodDao } from "./DB/Dao/Food/IFoodDao";
import { IMenuDao } from "./DB/Dao/Menu/IMenuDao";
import { FoodTable } from "./DB/Table/FoodTable";
import { MenuTable } from "./DB/Table/MenuTable";
import { Container } from "./DI/Container";
import { InitializationProcess } from "./DI/InitializationProcess";
import { InjectionProcess } from "./DI/InjectionProcess";
import { InstantiationProcess } from "./DI/InstantiationProcess";
import { ServiceManager } from "./ServiceManager/ServiceManager";
import { DateHelper } from "./Util/DateHelper";
import { PathHelper } from "./Util/PathHelper";

class App {

    static main() {

        PathHelper.Init();

        let container: Container = new Container();

        // ---- DI ----
        let instantiation: InstantiationProcess = new InstantiationProcess();
        instantiation.Run(container);
    
        let injection: InjectionProcess = new InjectionProcess();
        injection.Run(container);

        // TODO 菜品
        let foodDao: IFoodDao = container.Get("IFoodDao");
        let foodArr: FoodTable[] = [
            {id: 1, name: "红烧鱼", supplier: "老A"},
            {id: 2, name: "黄花菜", supplier: "厨禾秀"},
            {id: 3, name: "炒蛋", supplier: "小C"},
        ];
        foodDao.AddFoods(foodArr);

        // TODO 菜单
        let menuDao: IMenuDao = container.Get("IMenuDao");
        let menu: MenuTable = new MenuTable();
        menu.id = 1;
        menu.yyyymmdd = DateHelper.GetYYYYMMDD();
        menu.foodIdArr = [1, 2, 3];
        menuDao.AddMenu(menu);
    
        // ---- INIT ----
        let initilization: InitializationProcess = new InitializationProcess();
        initilization.Run(container);

        // ---- RUN ----
        let serviceManager: ServiceManager = container.Get(ServiceManager.name);
        serviceManager.StartService();
    
    }

}

App.main();