import axios from "axios";
import { SplitDateStr } from "../Util/DateHelper";

export class HomeMain {

    static Main() {
        let home = document.getElementById("Home");
        if (!home) {
            return;
        }
        GetMenu();

        let lunchOrder = document.getElementById("MainNotice")
        lunchOrder.style.display = "none";

    }

}

// HOME
function GetMenu() {

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
        let ul = menuListEle.lastElementChild;

        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            let li = CreateFoodLi(food.id, food.name, food.supplier);
            ul.appendChild(li);
        }

    });

}

function SetMenuDate(dateStr: string) {
    dateStr = SplitDateStr(dateStr);
    let title = document.getElementById("MainTitle");
    let h1: HTMLElement = title.firstElementChild as HTMLElement;
    h1.innerText = dateStr + " 午餐菜单";
}

function CreateFoodLi(foodId: number, foodName: string, supplier: string): HTMLLIElement {

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