"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGetAllCommentService = void 0;
class AdminGetAllCommentService {
    constructor() { }
    Inject(http, foodDao, commentDao) {
        this.http = http;
        this.foodDao = foodDao;
        this.commentDao = commentDao;
    }
    Listening() {
        this.http.PostListen("/Admin/GetAllComment", (req, res) => {
            // let isAdmin = RequestQueryHelper.IsAdministrator(req);
            // if (!isAdmin) {
            //     res.status(500).end();
            //     return;
            // }
            let map = new Map();
            let allComment = this.commentDao.GetAllComment();
            for (let i = 0; i < allComment.length; i += 1) {
                let com = allComment[i];
                let one = map.get(com.foodId);
                if (!one) {
                    one = {
                        foodId: com.foodId,
                        foodName: this.foodDao.GetFood(com.foodId).name,
                        commentArr: []
                    };
                    map.set(com.foodId, one);
                }
                let comment = {
                    yymmdd: com.yymmdd,
                    star: com.star,
                    tags: com.tags,
                    content: com.content
                };
                one.commentArr.push(comment);
            }
            let arr = [];
            map.forEach(value => {
                arr.push(value);
            });
            res.json(arr);
            // console.log(arr);
        });
    }
}
exports.AdminGetAllCommentService = AdminGetAllCommentService;
//# sourceMappingURL=AdminGetAllCommentService.js.map