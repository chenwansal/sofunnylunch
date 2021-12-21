"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
const FoodGo_1 = require("./Assets/FoodGo");
class HomeMain {
    static Main() {
        let home = document.getElementById("Home");
        if (!home) {
            return;
        }
        GetMenu();
        // 关闭用餐排队
        let lunchOrder = document.getElementById("MainNotice");
        if (lunchOrder) {
            lunchOrder.style.display = "none";
        }
        // 关闭评论
        ShowComment(false);
        // 初始化评论
        InitComment();
    }
}
exports.HomeMain = HomeMain;
// ==== 菜单相关 ====
function GetMenu() {
    axios_1.default.post("/GetMenu").then(res => {
        let data = res.data;
        SetMenuDate(data.yyyymmdd);
        let menuListEle = document.getElementById("MenuList");
        for (let i = 0; i < menuListEle.children.length; i += 1) {
            let liChild = menuListEle.children[i];
            liChild.remove();
            // console.log("移除子节点" + liChild.nodeName);
        }
        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            if (!food.name || food.name === "") {
                continue;
            }
            let foodGo = new FoodGo_1.FoodGo(menuListEle, food.id, food.name, "");
        }
    });
}
function SetMenuDate(dateStr) {
    dateStr = DateHelper_1.SplitDateStr(dateStr);
    let title = document.getElementById("MainTitle");
    let h1 = title.firstElementChild;
    h1.innerText = dateStr + " 午餐菜单";
}
// ==== 评论相关 ====
let CommentData = {
    foodId: 0,
    star: 1,
    content: "",
    commenter: "",
};
let starArr = [];
let redHeartSrc = "./Heart.png";
let emptyHeartSrc = "./EmptyHeart.png";
function InitComment() {
    // STAR
    let starGroup = document.getElementById("CommentStarGroup");
    for (let i = 0; i < 5; i += 1) {
        let starImg = document.createElement("img");
        starImg.src = redHeartSrc;
        starImg.setAttribute("star", i.toString());
        starArr.push(starImg);
        starGroup.appendChild(starImg);
        starImg.onclick = (e) => {
            let j = i;
            SetCommentStar(j);
        };
    }
    // SUBMIT
    let submitComment = document.getElementById("SubComment");
    submitComment.onclick = (e) => {
        SubmitComment();
    };
    // CLOSE
    let closeCommentBtn = document.getElementById("CloseComment");
    closeCommentBtn.onclick = (e) => {
        ShowComment(false);
    };
}
function SetCommentStar(score) {
    for (let i = 0; i < starArr.length; i += 1) {
        let starImg = starArr[i];
        if (i <= score) {
            starImg.src = redHeartSrc;
        }
        else {
            starImg.src = emptyHeartSrc;
        }
    }
    CommentData.star = score;
}
function ShowComment(isShow) {
    let popupMask = document.getElementById("PopupMask");
    let commentBd = document.getElementById("PopupComment");
    if (isShow) {
        popupMask.style.display = "block";
        commentBd.style.display = "block";
    }
    else {
        popupMask.style.display = "none";
        commentBd.style.display = "none";
    }
}
function PopupComment(foodId, foodName) {
    let title = document.getElementById("CommentTitle");
    title.innerText = "评价: " + foodName;
    CommentData.foodId = foodId;
}
function SubmitComment() {
    let content = document.getElementById("CommentContent");
    CommentData.content = content.value;
    console.assert(content);
    let commenter = document.getElementById("Commenter");
    CommentData.commenter = commenter.value;
    console.assert(commenter);
    axios_1.default.post("/Comment", {
        data: CommentData
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}
