import { DateHelper } from "../../../Util/DateHelper";
import { MenuTable } from "../../Table/MenuTable";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { JsonVisitor } from "../../JsonVisitor";
import { PathHelper } from "../../../Util/PathHelper";
import { IMenuDao } from "./IMenuDao";

export class MenuDao implements IMenuDao {

    allMenu: MenuTable[];
    todayMenu: MenuTable;

    constructor() {}

    CachingAllMenu(): void {
        this.allMenu = this.GetAllMenu();
        this.todayMenu = this.GetTodayMenu();
    }

    GetTodayMenu(): MenuTable {

        if (this.todayMenu != null) {
            return this.todayMenu;
        }

        if (this.allMenu != null) {
            this.todayMenu = this.allMenu.find(value => value.yyyymmdd == DateHelper.GetYYYYMMDD());
            return this.todayMenu;
        } else {
            console.warn("未实现");
        }

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
            return [];
        }
        let files: string[] = readdirSync(dir);
        let menuArr: MenuTable[] = [];
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let menu: MenuTable = JsonVisitor.ReadJsonFromFile<MenuTable>(dir + "/" + file);
            menuArr.push(menu);
        }
        return menuArr;
    }

}