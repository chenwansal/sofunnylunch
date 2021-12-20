"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
class AdminMain {
    static Main() {
        let admin = document.getElementById("Admin");
        if (!admin) {
            return;
        }
        ListenNavSwitch();
        ListenSubmitMenu();
    }
}
exports.AdminMain = AdminMain;
// NAV SWITCH
function ListenNavSwitch() {
    let navAddMenuLink = document.getElementById("NavAddMenu");
    navAddMenuLink.onclick = OpenAddMenuBody;
}
function OpenAddMenuBody(e) {
    let body = document.getElementById("AddMenuBody");
    body.style.display = "block";
}
function OpenStatisticsBocy(e) {
}
// ADMIN
function ListenSubmitMenu() {
    let submitButton = document.getElementById("SubmitMenuButton");
    submitButton.onclick = ev => {
        let date = document.getElementById("MenuDate");
        let a = document.getElementById("Menu_A");
        let b = document.getElementById("Menu_B");
        let c = document.getElementById("Menu_C");
        let d = document.getElementById("Menu_D");
        let e = document.getElementById("Menu_E");
        let f = document.getElementById("Menu_F");
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
