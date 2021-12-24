import { PathHelper } from "../../../Util/PathHelper";
import { JsonVisitor } from "../../JsonVisitor";
import { IdRecordTable } from "../../Table/IdRecordTable";
import { CommentDao } from "../Comment/CommentDao";
import { FoodDao } from "../Food/FoodDao";
import { MenuDao } from "../Menu/MenuDao";

export class IdRecordDao {

    static tempTable: IdRecordTable;

    static WriteId() {
        if (!this.tempTable) {
            this.tempTable = new IdRecordTable();
        }
        this.tempTable.menuId = MenuDao.currentId;
        this.tempTable.foodId = FoodDao.currentId;
        this.tempTable.commentId = CommentDao.currentId;
        JsonVisitor.WriteToFile(PathHelper.GetIdRecordFilePath(), this.tempTable);
    }

}