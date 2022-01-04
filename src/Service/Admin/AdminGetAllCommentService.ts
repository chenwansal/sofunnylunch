import { HttpServer } from "jackwebutil";
import { GetCommentBo } from "../../Bo/GetCommentBo";
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

            let arr = GetCommentBo.GetAllComment();

            res.json(arr);
            // console.log(arr);

        });

    }

}