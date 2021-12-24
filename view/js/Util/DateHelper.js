"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDateStr = exports.GetMMDD = exports.SplitDateToMMDD = exports.SplitDateToYYYYMMDD = void 0;
function SplitDateToYYYYMMDD(dateStr) {
    let yyyy = dateStr.substring(0, 4);
    let mm = dateStr.substring(4, 6);
    let dd = dateStr.substring(6, 8);
    return yyyy + "-" + mm + "-" + dd;
}
exports.SplitDateToYYYYMMDD = SplitDateToYYYYMMDD;
function SplitDateToMMDD(dateStr) {
    let mm = dateStr.substring(4, 6);
    let dd = dateStr.substring(6, 8);
    return mm + "-" + dd;
}
exports.SplitDateToMMDD = SplitDateToMMDD;
function GetMMDD() {
    let date = new Date();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let monthStr = m < 10 ? "0" + m : m;
    let dayStr = d < 10 ? "0" + d : d;
    return "" + monthStr + "-" + dayStr;
}
exports.GetMMDD = GetMMDD;
function GetDateStr(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let monthStr = m < 10 ? "0" + m : m;
    let dayStr = d < 10 ? "0" + d : d;
    return "" + y + monthStr + dayStr;
}
exports.GetDateStr = GetDateStr;
//# sourceMappingURL=DateHelper.js.map