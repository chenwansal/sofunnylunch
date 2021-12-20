"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDao = void 0;
const PathHelper_1 = require("../../../Util/PathHelper");
const JsonVisitor_1 = require("../../JsonVisitor");
const fs_1 = require("fs");
class CommentDao {
    constructor() { }
    Init() {
        this.arr = this.LoadAllComment();
    }
    LoadAllComment() {
        let arr = [];
        let dir = PathHelper_1.PathHelper.GetJsonDBCommentDir();
        let files = fs_1.readdirSync(dir);
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let comment = JsonVisitor_1.JsonVisitor.ReadJsonFromFile(file);
            if (comment) {
                arr.push(comment);
            }
        }
        return arr;
    }
    HasCommented(ip, foodId, yymmdd) {
        let index = this.arr.findIndex(value => value.ip == ip && value.foodId == foodId && value.yymmdd == yymmdd);
        if (index == -1) {
            return false;
        }
        else {
            return true;
        }
    }
    AddComment(comment) {
        this.arr.push(comment);
        JsonVisitor_1.JsonVisitor.WriteToFile(PathHelper_1.PathHelper.GetJsonDBCommentDir() + comment.id.toString() + ".json", comment);
    }
}
exports.CommentDao = CommentDao;
//# sourceMappingURL=CommentDao.js.map