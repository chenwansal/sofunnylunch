import { HttpServer } from "jackwebutil";
import { CommentDao } from "../../../DB/Dao/Comment/CommentDao";
import { CommentTable } from "../../../DB/Table/CommentTable";
import { DateHelper } from "../../../Util/DateHelper";

export class HomeCommentService {

    http: HttpServer;
    commentDao: CommentDao;

    constructor() { }

    Inject(http: HttpServer, commentDao: CommentDao) {
        this.http = http;
        this.commentDao = commentDao;
    }

    Init() {

        this.http.PostListen("/Comment", (req, res) => {

            type CommentMessage = {
                foodId: number,
                star: number,
                tags: string[],
                content: string,
                commenter: string,
            }

            let json: CommentMessage = req.body.data;
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
                })
                return;
            }

            let ip = req.ip;
            let yymmdd = DateHelper.GetYYYYMMDD();

            if (this.commentDao.HasCommented(ip, json.foodId, yymmdd)) {
                console.log("当日已评");
                res.json({
                    state: -2
                });
                return;
            }

            let table: CommentTable = {
                id: CommentDao.currentId,
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

            console.log(json)
            console.log(req.ip)

        });
    }

}