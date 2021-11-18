"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeDateController = void 0;
const DateHelper_1 = require("../../../Util/DateHelper");
class HomeDateController {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Init() {
        this.http.PostListen("/GetDate", (req, res) => {
            let json = {
                date: DateHelper_1.DateHelper.GetYYYYMMDD()
            };
            res.json(json);
        });
    }
}
exports.HomeDateController = HomeDateController;
