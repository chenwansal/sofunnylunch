"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static GetYYYYMMDD() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let monthStr = m < 10 ? "0" + m : m;
        let dayStr = d < 10 ? "0" + d : d;
        return "" + y + monthStr + dayStr;
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=DateHelper.js.map