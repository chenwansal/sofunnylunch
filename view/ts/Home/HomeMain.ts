import axios from "axios";
import { GetMMDD, SplitDateToMMDD, SplitDateToYYYYMMDD } from "../Util/DateHelper";
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

export function HomeMain() {
    let home = document.getElementById("Home");
    if (!home) {
        return;
    }

    // 本地信息
    let dateStr = GetMMDD();
    let todayMenuNav = document.getElementById("TodayMenuNav");
    todayMenuNav.innerText = dateStr + " 菜单";

    NoticeNoMenu(true);

    // 获取菜单
    GetMenu();

    // 关闭用餐排队
    let lunchOrder = document.getElementById("MainNotice");
    if (lunchOrder) {
        lunchOrder.style.display = "none";
    }

    // 移除预置
    RemovePreset();

    // 初始化评论
    InitComment();

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

        let dateStr = SplitDateToMMDD(data.yyyymmdd);
        let todayMenuNav = document.getElementById("TodayMenuNav");
        todayMenuNav.innerText = dateStr + " 菜单";

        let menuListEle = document.getElementById("MenuList");

        let tags = ["主菜好吃", "主菜难吃", "肉太老", "饭馊了", "菜馊了", "太咸", "太辣", "饭不熟", "配菜太少"];

        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            if (!food.name || food.name === "") {
                continue;
            }
            let foodGo = new FoodGo();
            foodGo.Inject(commentModel);
            foodGo.Init(menuListEle, food.id, food.name, "");
            for (let j = 0; j < tags.length; j += 1) {
                foodGo.AddTag(tags[j]);
            }
            foodGo.OnCleanAllTag = CleanAllTag;
        }

        // 关闭本地
        NoticeNoMenu(false);

    });

}

function NoticeNoMenu(isNotice: boolean) {
    let NoMenuNotice = document.getElementById("NoMenuNotice");
    NoMenuNotice.style.display = isNotice ? "block" : "none";

    let submitCommentBtn = document.getElementById("SubmitComment");
    submitCommentBtn.style.display = isNotice ? "none" : "block";
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

// ==== 评论相关 ====
function InitComment(): void {

    // SUBMIT
    let submitComment = document.getElementById("SubmitComment");
    submitComment.onclick = (e) => {
        SubmitComment();
    };

}

function SubmitComment(): void {

    axios.post("/Comment", {
        data: commentModel
    }).then(res => {
        console.log(res.data);
    }).catch(err => {
        console.error(err);
    });
}