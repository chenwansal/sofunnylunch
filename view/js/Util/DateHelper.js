"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDateStr = exports.SplitDateStr = void 0;
function SplitDateStr(dateStr) {
    let yyyy = dateStr.substring(0, 4);
    let mm = dateStr.substring(4, 6);
    let dd = dateStr.substring(6, 8);
    return yyyy + "-" + mm + "-" + dd;
}
exports.SplitDateStr = SplitDateStr;
function GetDateStr(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let monthStr = m < 10 ? "0" + m : m;
    let dayStr = d < 10 ? "0" + d : d;
    return "" + y + monthStr + dayStr;
}
exports.GetDateStr = GetDateStr;
