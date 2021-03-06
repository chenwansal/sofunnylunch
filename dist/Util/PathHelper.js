"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathHelper = void 0;
const fs_1 = require("fs");
class PathHelper {
    static Init() {
        this.MkdirIfNotExists(this.GetDbRootDir());
        this.MkdirIfNotExists(this.GetJsonDBFoodDir());
        this.MkdirIfNotExists(this.GetJsonDBMenuDir());
        this.MkdirIfNotExists(this.GetJsonDBCommentDir());
    }
    static GetRootDir() {
        return process.cwd();
    }
    static GetDbRootDir() {
        return this.GetRootDir() + "/jsondb/";
    }
    static GetIdRecordFilePath() {
        return this.GetDbRootDir() + "IdRecord.json";
    }
    static GetJsonDBMenuDir() {
        return this.GetRootDir() + "/jsondb/Menu/";
    }
    static GetJsonDBFoodDir() {
        return this.GetRootDir() + "/jsondb/Food/";
    }
    static GetJsonDBCommentDir() {
        return this.GetRootDir() + "/jsondb/Comment/";
    }
    static MkdirIfNotExists(dir) {
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdirSync(dir);
        }
    }
}
exports.PathHelper = PathHelper;
//# sourceMappingURL=PathHelper.js.map