import { PathHelper } from "../../../Util/PathHelper";
import { JsonVisitor } from "../../JsonVisitor";
import { CommentTable } from "../../Table/CommentTable";
import { readdirSync } from "fs";
import { IdRecordDao } from "../IdRecord/IdRecordDao";


export class CommentDao {

    static currentId: number;

    arr: CommentTable[];

    constructor() {}

    Init() {
        this.arr = this.LoadAllComment();
    }

    private LoadAllComment(): CommentTable[] {

        let arr = [];

        let dir = PathHelper.GetJsonDBCommentDir();
        let files = readdirSync(dir);
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let comment = JsonVisitor.ReadJsonFromFile<CommentTable>(dir + file);
            if (comment) {
                arr.push(comment);
            }
        }

        return arr;

    }

    HasCommented(ip:string, foodId: number, yymmdd: string): boolean {
        let index = this.arr.findIndex(value => value.ip == ip && value.foodId == foodId && value.yymmdd == yymmdd);
        if (index == -1) {
            return false;
        } else {
            return true;
        }
    }

    AddComment(comment: CommentTable): void {

        this.arr.push(comment);

        JsonVisitor.WriteToFile(PathHelper.GetJsonDBCommentDir() + comment.id.toString() + ".json", comment);

        CommentDao.currentId += 1;
        IdRecordDao.WriteId();

    }

}