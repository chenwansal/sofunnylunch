import { HttpServer } from "jackwebutil";
import { CommentDao } from "../../DB/Dao/Comment/CommentDao";
import { FoodDao } from "../../DB/Dao/Food/FoodDao";
import { RequestQueryHelper } from "../../Util/RequestQueryHelper";

export class AdminGetAllCommentService {

    http: HttpServer;
    foodDao: FoodDao;
    commentDao: CommentDao;

    constructor() {}

    Inject(http: HttpServer, foodDao: FoodDao, commentDao: CommentDao) {
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

            let map: Map<number, OneFoodComment> = new Map();

            let allComment = this.commentDao.GetAllComment();
            for (let i = 0; i < allComment.length; i += 1) {
                let com = allComment[i];
                let one = map.get(com.foodId);
                if (!one) {
                    one = {
                        foodId: com.foodId,
                        foodName: this.foodDao.GetFood(com.foodId).name,
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

            res.json(arr);
            // console.log(arr);

        });

    }

}