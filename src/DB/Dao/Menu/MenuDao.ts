import { DateHelper } from "../../../Util/DateHelper";
import { MenuTable } from "../../Table/MenuTable";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { JsonVisitor } from "../../JsonVisitor";
import { PathHelper } from "../../../Util/PathHelper";

export class MenuDao {

    allMenu: MenuTable[];
    todayMenu: MenuTable;

    constructor() { }

    Init(): void {
        this.allMenu = this.GetAllMenu();
        this.todayMenu = this.GetTodayMenu();
    }

    GetTodayMenu(): MenuTable {

        if (this.todayMenu != null) {
            return this.todayMenu;
        }

        if (this.allMenu == null) {
            this.allMenu = this.GetAllMenu();
        }

        this.todayMenu = this.allMenu.find(value => value.yyyymmdd == DateHelper.GetYYYYMMDD());
        return this.todayMenu;

    }

    AddMenu(menu: MenuTable): void {

        if (this.allMenu != null) {
            this.allMenu.push(menu);
        }

        let dir = PathHelper.GetJsonDBMenuDir() + menu.yyyymmdd;
        let path = dir + ".json";
        JsonVisitor.WriteToFile(path, menu);
    }

    GetAllMenu(): MenuTable[] {

        if (this.allMenu != null) {
            return this.allMenu;
        }

        let dir: string = PathHelper.GetJsonDBMenuDir();
        if (!existsSync(dir)) {
            console.log("不存在目录:" + dir);
            return [];
        }
        let files: string[] = readdirSync(dir);
        let menuArr: MenuTable[] = [];
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let path = dir + "/" + file;
            let menu: MenuTable = JsonVisitor.ReadJsonFromFile<MenuTable>(path);
            if (menu) {
                menuArr.push(menu);
            } else {
                console.log("不存在文件:" + path);
            }
        }

        if (menuArr.length == 0) {
            console.log("无菜单");
        }
        return menuArr;
    }

}