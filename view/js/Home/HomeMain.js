"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
class HomeMain {
    static Main() {
        let home = document.getElementById("Home");
        if (!home) {
            return;
        }
        GetMenu();
        let lunchOrder = document.getElementById("MainNotice");
        lunchOrder.style.display = "none";
    }
}
exports.HomeMain = HomeMain;
// HOME
function GetMenu() {
    axios_1.default.post("/GetMenu").then(res => {
        let data = res.data;
        SetMenuDate(data.yyyymmdd);
        let menuListEle = document.getElementById("MenuList");
        let ul = menuListEle.lastElementChild;
        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            let li = CreateFoodLi(food.id, food.name, food.supplier);
            ul.appendChild(li);
        }
    });
}
function SetMenuDate(dateStr) {
    dateStr = DateHelper_1.SplitDateStr(dateStr);
    let title = document.getElementById("MainTitle");
    let h1 = title.firstElementChild;
    h1.innerText = dateStr + " 午餐菜单";
}
function CreateFoodLi(foodId, foodName, supplier) {
    // <li> 菜元素
    let li = document.createElement("li");
    li.setAttribute("foodId", foodId.toString());
    li.classList.add("menu-food");
    // <i> 名称
    let nameI = document.createElement("i");
    let text = "";
    text += foodName;
    if (supplier) {
        text += supplier;
    }
    nameI.innerText = text;
    li.appendChild(nameI);
    // <input> 评价
    let inputComment = document.createElement("input");
    inputComment.type = "button";
    inputComment.value = "评价";
    li.appendChild(inputComment);
    return li;
}
