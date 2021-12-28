"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
let allComment = [];
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
        OpenStatisticsBody(false);
    };
    navOpenStatisticsBody.onclick = (e) => {
        navOpenStatisticsBody.setAttribute("active", "1");
        navOpenAddMenuBody.removeAttribute("active");
        OpenAddMenuBody(false);
        OpenStatisticsBody(true);
    };
}
function OpenAddMenuBody(isOpen) {
    let body = document.getElementById("AddMenuBody");
    body.style.display = isOpen ? "block" : "none";
}
function OpenStatisticsBody(isOpen) {
    let body = document.getElementById("StatisticsBody");
    body.style.display = isOpen ? "block" : "none";
    if (isOpen) {
        GetAllComment();
    }
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
function GetAllComment() {
    axios_1.default.post("/Admin/GetAllComment").then(res => {
        console.log(res.data);
        if (res.data) {
            allComment = res.data;
            RenderAllComment();
        }
    }).catch(err => {
        alert(err);
    });
}
function RenderAllComment() {
    let foodGroup = document.getElementById("FoodGroup");
    for (let i = 0; i < allComment.length; i += 1) {
        let food = allComment[i];
        let oneFood = document.createElement("div");
        oneFood.className = "one-food";
        foodGroup.appendChild(oneFood);
        let foodAvatar = document.createElement("div");
        foodAvatar.className = "food-avatar";
        oneFood.appendChild(foodAvatar);
        let iName = document.createElement("i");
        iName.className = "food-name";
        iName.innerText = "菜名: " + food.foodName + "  ";
        foodAvatar.appendChild(iName);
        let iGood = document.createElement("i");
        iGood.className = "good-num";
        foodAvatar.appendChild(iGood);
        let iBad = document.createElement("i");
        iBad.className = "bad-num";
        foodAvatar.appendChild(iBad);
        let badNum = 0;
        let goodNum = 0;
        let commentGroup = document.createElement("div");
        commentGroup.className = "comment-group";
        oneFood.appendChild(commentGroup);
        for (let j = 0; j < food.commentArr.length; j += 1) {
            let comm = food.commentArr[j];
            let oneComm = document.createElement("p");
            oneComm.className = "one-comment";
            commentGroup.appendChild(oneComm);
            let iDate = document.createElement("i");
            iDate.className = "data";
            iDate.innerText = comm.yymmdd;
            oneComm.appendChild(iDate);
            let iStarBD = document.createElement("i");
            iStarBD.className = "b";
            iStarBD.innerText = " 评价: ";
            oneComm.appendChild(iStarBD);
            let iStar = document.createElement("i");
            iStar.className = "star";
            iStar.setAttribute("star", comm.star.toString());
            iStar.innerText = comm.star == 0 ? "难吃" : "好吃";
            oneComm.appendChild(iStar);
            if (comm.star == 5) {
                goodNum += 1;
            }
            else {
                badNum += 1;
            }
            let iCommBD = document.createElement("i");
            iCommBD.className = "b";
            iCommBD.innerText = "  留言: ";
            oneComm.appendChild(iCommBD);
            let iComm = document.createElement("i");
            let content = comm.content ? comm.content + " | " : "";
            for (let n = 0; n < comm.tags.length; n += 1) {
                if (n < comm.tags.length - 1) {
                    content += comm.tags[n] + " | ";
                }
                else {
                    content += comm.tags[n];
                }
            }
            iComm.innerText = content;
            oneComm.appendChild(iComm);
        }
        iGood.innerText = "好评(" + goodNum.toString() + ")";
        iBad.innerText = "差评(" + badNum.toString() + ")";
    }
}
//# sourceMappingURL=AdminMain.js.map