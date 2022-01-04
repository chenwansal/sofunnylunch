"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommentBo = void 0;
const Daos_1 = require("../DB/Daos");
class GetCommentBo {
    constructor() { }
    // REFACTOR 重复了，需优化结构
    static GetTodayFoodComment() {
        let commentDao = Daos_1.Daos.CommentDao;
        let foodDao = Daos_1.Daos.FoodDao;
        let menuDao = Daos_1.Daos.MenuDao;
        let todayMenu = menuDao.GetTodayMenu();
        let map = new Map();
        let allComment = commentDao.GetAllComment();
        for (let i = 0; i < allComment.length; i += 1) {
            let com = allComment[i];
            let foodId = com.foodId;
            if (todayMenu.foodIdArr.findIndex(value => value == foodId) == -1) {
                continue;
            }
            let one = map.get(com.foodId);
            if (!one) {
                one = {
                    foodId: com.foodId,
                    foodName: foodDao.GetFood(com.foodId).name,
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
        return arr;
    }
    static GetAllComment() {
        let commentDao = Daos_1.Daos.CommentDao;
        let foodDao = Daos_1.Daos.FoodDao;
        let map = new Map();
        let allComment = commentDao.GetAllComment();
        for (let i = 0; i < allComment.length; i += 1) {
            let com = allComment[i];
            let one = map.get(com.foodId);
            if (!one) {
                one = {
                    foodId: com.foodId,
                    foodName: foodDao.GetFood(com.foodId).name,
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
        return arr;
    }
}
exports.GetCommentBo = GetCommentBo;
//# sourceMappingURL=GetCommentBo.js.map