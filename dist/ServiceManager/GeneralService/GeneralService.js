"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralService = void 0;
const DateHelper_1 = require("../../Util/DateHelper");
class GeneralService {
    constructor() {
    }
    GetDate() {
        return DateHelper_1.DataHelper.GetYYYYMMDD();
    }
    GetMenu() {
        return null;
    }
}
exports.GeneralService = GeneralService;
