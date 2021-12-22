import axios from "axios";
import { SplitDateStr } from "../Util/DateHelper";
import { FoodGo } from "./Assets/FoodGo";

export type CommentModel = {
    foodId: number,
    star: number,
    tags: string[],
    content: string,
    commenter: string,
}

let commentModel: CommentModel = {
    foodId: 0,
    star: 1,
    tags: [],
    content: "",
    commenter: "",
}

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

        // 移除预置
        RemovePreset();

        // 关闭评论
        ShowComment(false);

        // 初始化评论
        InitComment();

    }

}

function RemovePreset() {

    // 移除预置菜单
    let menuListEle = document.getElementById("MenuList");
    for (let i = 0; i < menuListEle.children.length; i += 1) {
        let liChild = menuListEle.children[i];
        liChild.remove();
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

        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            if (!food.name || food.name === "") {
                continue;
            }
            let foodGo = new FoodGo();
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

function SetMenuDate(dateStr: string): void {
    dateStr = SplitDateStr(dateStr);
    let title = document.getElementById("MainTitle");
    let h1: HTMLElement = title.firstElementChild as HTMLElement;
    h1.innerText = dateStr + " 午餐菜单";
}

// ==== 评论相关 ====
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

function SetCommentStar(score: number): void {
    for (let i = 0; i < starArr.length; i += 1) {
        let starImg = starArr[i];
        if (i <= score) {
            starImg.src = redHeartSrc;
        } else {
            starImg.src = emptyHeartSrc;
        }
    }

    commentModel.star = score;

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

    commentModel.foodId = foodId;

}

function SubmitComment(): void {

    let content = document.getElementById("CommentContent") as HTMLTextAreaElement;
    commentModel.content = content.value;
    console.assert(content);

    let commenter = document.getElementById("Commenter") as HTMLInputElement;
    commentModel.commenter = commenter.value;
    console.assert(commenter);

    axios.post("/Comment", {
        data: commentModel
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}