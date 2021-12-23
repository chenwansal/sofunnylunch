"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
function AdminMain() {
    let admin = document.getElementById("Admin");
    if (!admin) {
        return;
    }
    InitNav();
    InitSubmitMenu();
}
exports.AdminMain = AdminMain;
// NAV SWITCH
function InitNav() {
    let navOpenAddMenuBody = document.getElementById("NavAddMenu");
    let navOpenStatisticsBody = document.getElementById("NavStatistics");
    navOpenAddMenuBody.setAttribute("active", "1");
    navOpenAddMenuBody.onclick = (e) => {
        navOpenStatisticsBody.removeAttribute("active");
        navOpenAddMenuBody.setAttribute("active", "1");
        OpenAddMenuBody(true);
        OpenStatisticsBocy(false);
    };
    navOpenStatisticsBody.onclick = (e) => {
        navOpenStatisticsBody.setAttribute("active", "1");
        navOpenAddMenuBody.removeAttribute("active");
        OpenAddMenuBody(false);
        OpenStatisticsBocy(true);
    };
}
function OpenAddMenuBody(isOpen) {
    let body = document.getElementById("AddMenuBody");
    body.style.display = isOpen ? "block" : "none";
}
function OpenStatisticsBocy(isOpen) {
    let body = document.getElementById("StatisticsBody");
    body.style.display = isOpen ? "block" : "none";
}
// ADMIN
function InitSubmitMenu() {
    let date = document.getElementById("MenuDate");
    let a = document.getElementById("Menu_A");
    let b = document.getElementById("Menu_B");
    let c = document.getElementById("Menu_C");
    let d = document.getElementById("Menu_D");
    let e = document.getElementById("Menu_E");
    let f = document.getElementById("Menu_F");
    date.valueAsDate = new Date();
    let submitButton = document.getElementById("SubmitMenuButton");
    submitButton.onclick = ev => {
        let newMenu = {
            date: DateHelper_1.GetDateStr(date.valueAsDate),
            foodArr: [a.value, b.value, c.value, d.value, e.value, f.value]
        };
        console.log("点击" + newMenu.date, newMenu.foodArr);
        axios_1.default.post("/AddMenu", {
            data: newMenu
        }).then(res => {
            console.log("收到:" + res.data);
        }).catch(err => {
            console.log("err:" + err);
        });
    };
}
