"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
axios_1.default.post("/GetDate").then(res => {
    let dateStr = res.data.date;
    let title = document.getElementById("MainTitle");
    let h1 = title === null || title === void 0 ? void 0 : title.firstElementChild;
    h1.innerText = dateStr + "午餐菜单";
    console.log("菜单" + dateStr);
});
