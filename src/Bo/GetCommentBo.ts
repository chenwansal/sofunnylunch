import { Daos } from "../DB/Daos";

type OneFoodComment = {
    foodId: number,
    foodName: string,
    commentArr: Comment[]
}

type Comment = {
    yymmdd: string,
    star: number,
    tags: string[],
    content: string
}

export class GetCommentBo {

    constructor() { }

    // REFACTOR 重复了，需优化结构
    static GetTodayFoodComment(): OneFoodComment[] {

        let commentDao = Daos.CommentDao;
        let foodDao = Daos.FoodDao;

        let menuDao = Daos.MenuDao;

        let todayMenu = menuDao.GetTodayMenu();

        let map: Map<number, OneFoodComment> = new Map();

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
                }
                map.set(com.foodId, one);
            }
            let comment: Comment = {
                yymmdd: com.yymmdd,
                star: com.star,
                tags: com.tags,
                content: com.content
            }
            one.commentArr.push(comment);
        }

        let arr: OneFoodComment[] = [];

        map.forEach(value => {
            arr.push(value);
        });

        return arr;

    }

    static GetAllComment(): OneFoodComment[] {

        let commentDao = Daos.CommentDao;
        let foodDao = Daos.FoodDao;

        let map: Map<number, OneFoodComment> = new Map();

        let allComment = commentDao.GetAllComment();
        for (let i = 0; i < allComment.length; i += 1) {
            let com = allComment[i];
            let one = map.get(com.foodId);
            if (!one) {
                one = {
                    foodId: com.foodId,
                    foodName: foodDao.GetFood(com.foodId).name,
                    commentArr: []
                }
                map.set(com.foodId, one);
            }
            let comment: Comment = {
                yymmdd: com.yymmdd,
                star: com.star,
                tags: com.tags,
                content: com.content
            }
            one.commentArr.push(comment);
        }

        let arr: OneFoodComment[] = [];

        map.forEach(value => {
            arr.push(value);
        });

        return arr;

    }

}