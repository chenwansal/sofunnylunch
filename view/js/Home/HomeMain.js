"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
class HomeMain {
    static Main() {
        let home = document.getElementById("Home");
        if (home) {
            GetMenu();
        }
    }
}
exports.HomeMain = HomeMain;
// HOME
function GetMenu() {
    axios_1.default.post("/GetMenu").then(res => {
        let data = res.data;
        let dateStr = DateHelper_1.SplitDateStr(data.yyyymmdd);
        let title = document.getElementById("MainTitle");
        let h1 = title === null || title === void 0 ? void 0 : title.firstElementChild;
        h1.innerText = dateStr + " 午餐菜单";
        let menuListEle = document.getElementById("MenuList");
        let ul = menuListEle === null || menuListEle === void 0 ? void 0 : menuListEle.lastElementChild;
        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            let li = document.createElement("li");
            li.setAttribute("foodId", food.id.toString());
            li.innerText = food.name + "(提供方:" + food.supplier + ")";
            ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
        }
    });
}
