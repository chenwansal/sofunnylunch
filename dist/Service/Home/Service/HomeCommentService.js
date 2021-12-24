"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeCommentService = void 0;
const CommentDao_1 = require("../../../DB/Dao/Comment/CommentDao");
const DateHelper_1 = require("../../../Util/DateHelper");
class HomeCommentService {
    constructor() { }
    Inject(http, commentDao) {
        this.http = http;
        this.commentDao = commentDao;
    }
    Init() {
        this.http.PostListen("/Comment", (req, res) => {
            let json = req.body.data;
            let isCheckData = true;
            if (!json) {
                isCheckData = false;
            }
            if (!json.tags || (json.tags.length == 0 && !json.content)) {
                isCheckData = false;
                return;
            }
            if (!isCheckData) {
                res.json({
                    state: -1
                });
                return;
            }
            let ip = req.ip;
            let yymmdd = DateHelper_1.DateHelper.GetYYYYMMDD();
            if (this.commentDao.HasCommented(ip, json.foodId, yymmdd)) {
                console.log("当日已评");
                res.json({
                    state: -2
                });
                return;
            }
            let table = {
                id: CommentDao_1.CommentDao.currentId,
                foodId: json.foodId,
                star: json.star,
                tags: json.tags,
                content: json.content,
                commenter: json.commenter,
                yymmdd: yymmdd,
                ip: ip,
            };
            this.commentDao.AddComment(table);
            res.json({
                state: 1
            });
            console.log(json);
            console.log(req.ip);
        });
    }
}
exports.HomeCommentService = HomeCommentService;
//# sourceMappingURL=HomeCommentService.js.map