"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeMain = void 0;
const axios_1 = require("axios");
const DateHelper_1 = require("../Util/DateHelper");
const FoodGo_1 = require("./Assets/FoodGo");
let commentModel = {
    foodId: 0,
    star: 1,
    tags: [],
    content: "",
    commenter: "",
};
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
        // 移除预置
        RemovePreset();
        // 关闭评论
        ShowComment(false);
        // 初始化评论
        InitComment();
    }
}
exports.HomeMain = HomeMain;
function RemovePreset() {
    // 移除预置菜单
    let menuListEle = document.getElementById("MenuList");
    for (let i = 0; i < menuListEle.children.length; i += 1) {
        let liChild = menuListEle.children[i];
        liChild.remove();
    }
}
// ==== 菜单相关 ====
function GetMenu() {
    axios_1.default.post("/GetMenu").then(res => {
        let data = res.data;
        SetMenuDate(data.yyyymmdd);
        let menuListEle = document.getElementById("MenuList");
        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            if (!food.name || food.name === "") {
                continue;
            }
            let foodGo = new FoodGo_1.FoodGo();
            foodGo.Inject(commentModel);
            foodGo.Init(menuListEle, food.id, food.name, "");
            foodGo.AddTag("好不好吃");
            foodGo.AddTag("难吃");
            foodGo.OnCleanAllTag = CleanAllTag;
        }
    });
}
function CleanAllTag() {
    commentModel.tags = [];
    let tags = document.getElementsByClassName("tag");
    for (let i = 0; i < tags.length; i += 1) {
        let tag = tags[i];
        tag.removeAttribute("active");
    }
    let likes = document.getElementsByClassName("like");
    for (let i = 0; i < likes.length; i += 1) {
        let like = likes[i];
        like.removeAttribute("active");
    }
    let unlikes = document.getElementsByClassName("unlike");
    for (let i = 0; i < unlikes.length; i += 1) {
        let unlike = unlikes[i];
        unlike.removeAttribute("active");
    }
}
function SetMenuDate(dateStr) {
    dateStr = DateHelper_1.SplitDateStr(dateStr);
    let title = document.getElementById("MainTitle");
    let h1 = title.firstElementChild;
    h1.innerText = dateStr + " 午餐菜单";
}
// ==== 评论相关 ====
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
    commentModel.star = score;
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
    commentModel.foodId = foodId;
}
function SubmitComment() {
    let content = document.getElementById("CommentContent");
    commentModel.content = content.value;
    console.assert(content);
    let commenter = document.getElementById("Commenter");
    commentModel.commenter = commenter.value;
    console.assert(commenter);
    axios_1.default.post("/Comment", {
        data: commentModel
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}
