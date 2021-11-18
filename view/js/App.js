"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
axios_1.default.post("/GetMenu").then(res => {
    let data = res.data;
    let dateStr = dateSplit(data.yyyymmdd);
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
function dateSplit(dateStr) {
    let yyyy = dateStr.substring(0, 4);
    let mm = dateStr.substring(4, 6);
    let dd = dateStr.substring(6, 8);
    return yyyy + "-" + mm + "-" + dd;
}
