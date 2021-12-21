import axios from "axios";
import { SplitDateStr } from "../Util/DateHelper";
import { FoodGo } from "./Assets/FoodGo";

export class HomeMain {

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

// ==== 菜单相关 ====
function GetMenu(): void {

    axios.post("/GetMenu").then(res => {

        type FoodTable = {
            id: number,
            typeId: number,
            name: string,
            supplier: string,
        }

        type MenuDto = {
            id: number,
            yyyymmdd: string,
            foodArr: FoodTable[]
        }

        let data: MenuDto = res.data;

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
            let foodGo = new FoodGo(menuListEle, food.id, food.name, "");
        }

    });

}

function SetMenuDate(dateStr: string): void {
    dateStr = SplitDateStr(dateStr);
    let title = document.getElementById("MainTitle");
    let h1: HTMLElement = title.firstElementChild as HTMLElement;
    h1.innerText = dateStr + " 午餐菜单";
}

// ==== 评论相关 ====
let CommentData = {
    foodId: 0,
    star: 1,
    content: "",
    commenter: "",
}

let starArr: HTMLImageElement[] = [];
let redHeartSrc = "./Heart.png";
let emptyHeartSrc = "./EmptyHeart.png";

function InitComment(): void {

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

function SetCommentStar(score: number):void {
    for (let i = 0; i < starArr.length; i += 1) {
        let starImg = starArr[i];
        if (i <= score) {
            starImg.src = redHeartSrc;
        } else {
            starImg.src = emptyHeartSrc;
        }
    }

    CommentData.star = score;

}

function ShowComment(isShow: boolean): void {
    let popupMask = document.getElementById("PopupMask");
    let commentBd = document.getElementById("PopupComment");
    if (isShow) {
        popupMask.style.display = "block";
        commentBd.style.display = "block";
    } else {
        popupMask.style.display = "none";
        commentBd.style.display = "none";
    }
}

function PopupComment(foodId: number, foodName: string): void {
    
    let title = document.getElementById("CommentTitle");
    title.innerText = "评价: " + foodName;

    CommentData.foodId = foodId;

}

function SubmitComment(): void {

    let content = document.getElementById("CommentContent") as HTMLTextAreaElement;
    CommentData.content = content.value;
    console.assert(content);

    let commenter = document.getElementById("Commenter") as HTMLInputElement;
    CommentData.commenter = commenter.value;
    console.assert(commenter);

    axios.post("/Comment", {
        data: CommentData
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}