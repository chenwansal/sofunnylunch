import axios from "axios";
import { GetDateStr, SplitDateToYYYYMMDD } from "../Util/DateHelper";

export class AdminMain {

    static Main() {
        let admin = document.getElementById("Admin");
        if (!admin) {
            return;
        }
        
        ListenNavSwitch();

        ListenSubmitMenu();
        
    }
}

// NAV SWITCH
function ListenNavSwitch(): void {
    
    let navOpenAddMenuBody = document.getElementById("NavAddMenu");
    navOpenAddMenuBody.onclick = (e) => {
        OpenAddMenuBody(true);
        OpenStatisticsBocy(false);
    }

    let navOpenStatisticsBody = document.getElementById("NavStatistics");
    navOpenStatisticsBody.onclick = (e) => {
        OpenAddMenuBody(false);
        OpenStatisticsBocy(true);
    };

}

function OpenAddMenuBody(isOpen: boolean): void {
    let body = document.getElementById("AddMenuBody");
    body.style.display = isOpen ? "block" : "none";
}

function OpenStatisticsBocy(isOpen: boolean): void {
    let body = document.getElementById("StatisticsBody");
    body.style.display = isOpen ? "block" : "none";
}

// ADMIN
function ListenSubmitMenu(): void {

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
        }).catch(err => {
            console.log("err:" + err);
        });
    };

}