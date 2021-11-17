"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataHelper = void 0;
class DataHelper {
    static GetYYMMDD() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        return y + "-" + m + "-" + d;
    }
}
exports.DataHelper = DataHelper;
