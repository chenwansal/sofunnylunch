"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDao = void 0;
const DateHelper_1 = require("../../../Util/DateHelper");
const fs_1 = require("fs");
const JsonVisitor_1 = require("../../JsonVisitor");
const PathHelper_1 = require("../../../Util/PathHelper");
const IdRecordDao_1 = require("../IdRecord/IdRecordDao");
class MenuDao {
    constructor() { }
    Init() {
        this.allMenu = this.GetAllMenu();
        this.ResetTodayMenu();
    }
    ResetTodayMenu() {
        this.todayMenu = this.GetTodayMenu();
    }
    GetTodayMenu() {
        if (this.todayMenu) {
            return this.todayMenu;
        }
        if (!this.allMenu) {
            this.allMenu = this.GetAllMenu();
        }
        this.todayMenu = this.allMenu.find(value => value.yyyymmdd == DateHelper_1.DateHelper.GetYYYYMMDD());
        return this.todayMenu;
    }
    AddMenu(menu) {
        if (this.todayMenu) {
            if (menu.yyyymmdd == this.todayMenu.yyyymmdd) {
                this.todayMenu = menu;
            }
        }
        if (this.allMenu) {
            this.allMenu.push(menu);
        }
        let dir = PathHelper_1.PathHelper.GetJsonDBMenuDir() + menu.yyyymmdd;
        let path = dir + ".json";
        JsonVisitor_1.JsonVisitor.WriteToFile(path, menu);
        MenuDao.currentId += 1;
        IdRecordDao_1.IdRecordDao.WriteId();
    }
    GetAllMenu() {
        if (this.allMenu) {
            return this.allMenu;
        }
        let dir = PathHelper_1.PathHelper.GetJsonDBMenuDir();
        if (!fs_1.existsSync(dir)) {
            console.log("不存在目录:" + dir);
            return [];
        }
        let files = fs_1.readdirSync(dir);
        let menuArr = [];
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let path = dir + "/" + file;
            let menu = JsonVisitor_1.JsonVisitor.ReadJsonFromFile(path);
            if (menu) {
                menuArr.push(menu);
            }
            else {
                console.log("不存在文件:" + path);
            }
        }
        if (menuArr.length == 0) {
            console.log("无菜单");
        }
        return menuArr;
    }
}
exports.MenuDao = MenuDao;
//# sourceMappingURL=MenuDao.js.map