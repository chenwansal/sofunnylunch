import axios from "axios";
import { SplitDateStr } from "../Util/DateHelper";

export class HomeMain {

    static Main() {
        let home = document.getElementById("Home");
        if (home) {
            GetMenu();
        }
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

        let dateStr = SplitDateStr(data.yyyymmdd);
        let title = document.getElementById("MainTitle");
        let h1: HTMLElement = title?.firstElementChild as HTMLElement;
        h1.innerText = dateStr + " 午餐菜单";

        let menuListEle = document.getElementById("MenuList");
        let ul = menuListEle?.lastElementChild;

        for (let i = 0; i < data.foodArr.length; i += 1) {
            let food = data.foodArr[i];
            let li = document.createElement("li");
            li.setAttribute("foodId", food.id.toString());
            li.innerText = food.name + "(提供方:" + food.supplier + ")";
            ul?.appendChild(li);
        }

    });

}
