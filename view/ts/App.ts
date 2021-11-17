import axios from "axios";

axios.post("/GetDate").then(res => {
    let dateStr = res.data.date;
    let title = document.getElementById("MainTitle");
    let h1: HTMLElement = title?.firstElementChild as HTMLElement;
    h1.innerText = dateStr + " 午餐菜单";
});