import { existsSync, mkdirSync } from "fs";

export class PathHelper {

    static Init(): void {

        this.MkdirIfNotExists(this.GetDbRootDir())
        this.MkdirIfNotExists(this.GetJsonDBFoodDir());
        this.MkdirIfNotExists(this.GetJsonDBMenuDir());
        this.MkdirIfNotExists(this.GetJsonDBCommentDir());

    }

    static GetRootDir(): string {
        return process.cwd();
    }

    static GetDbRootDir(): string {
        return this.GetRootDir() + "/jsondb/"
    }

    static GetIdRecordFilePath() : string {
        return this.GetDbRootDir() + "IdRecord.json";
    }

    static GetJsonDBMenuDir(): string {
        return this.GetRootDir() + "/jsondb/Menu/";
    }

    static GetJsonDBFoodDir(): string {
        return this.GetRootDir() + "/jsondb/Food/";
    }

    static GetJsonDBCommentDir(): string {
        return this.GetRootDir() + "/jsondb/Comment/";
    }

    private static MkdirIfNotExists(dir: string): void {
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
    }

}