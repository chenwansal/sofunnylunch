import axios from "axios";
import { GetDateStr, SplitDateStr } from "../Util/DateHelper";

export class AdminMain {

    static Main() {
        let admin = document.getElementById("Admin");
        if (!admin) {
            return;
        }
        ListenSubmitMenu();
    }
}

// ADMIN
function ListenSubmitMenu() {

    type NewMenu = {
        date: string,
        foodArr: string[],
    }

    let submitButton = document.getElementById("SubmitMenuButton") as HTMLInputElement;
    submitButton.onclick = ev => {

        let date = document.getElementById("MenuDate") as HTMLInputElement;
        let a = document.getElementById("Menu_A") as HTMLInputElement;
        let b = document.getElementById("Menu_B") as HTMLInputElement;
        let c = document.getElementById("Menu_C") as HTMLInputElement;
        let d = document.getElementById("Menu_D") as HTMLInputElement;
        let e = document.getElementById("Menu_E") as HTMLInputElement;
        let f = document.getElementById("Menu_F") as HTMLInputElement;

        let newMenu: NewMenu = {
            date: GetDateStr(date.valueAsDate as Date),
            foodArr: [a.value, b.value, c.value, d.value, e.value, f.value]
        }

        console.log("点击" + newMenu.date , newMenu.foodArr);

        axios.post("/AddMenu", {
            data: newMenu
        }).then(res => {
            console.log("收到:" + res.data);
        });
    };

}