"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetAllCommentService = void 0;
const GetCommentBo_1 = require("../../Bo/GetCommentBo");
class AdminGetAllCommentService {
    constructor() { }
    Inject(http, foodDao, commentDao) {
        this.http = http;
        this.foodDao = foodDao;
        this.commentDao = commentDao;
    }
    Listening() {
        this.http.PostListen("/Admin/GetAllComment", (req, res) => {
            let arr = GetCommentBo_1.GetCommentBo.GetAllComment();
            res.json(arr);
            // console.log(arr);
        });
    }
}
exports.AdminGetAllCommentService = AdminGetAllCommentService;
//# sourceMappingURL=AdminGetAllCommentService.js.map