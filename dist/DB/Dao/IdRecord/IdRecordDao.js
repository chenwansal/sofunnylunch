"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdRecordDao = void 0;
const PathHelper_1 = require("../../../Util/PathHelper");
const JsonVisitor_1 = require("../../JsonVisitor");
const IdRecordTable_1 = require("../../Table/IdRecordTable");
const FoodDao_1 = require("../Food/FoodDao");
const MenuDao_1 = require("../Menu/MenuDao");
class IdRecordDao {
    static WriteId() {
        if (!this.tempTable) {
            this.tempTable = new IdRecordTable_1.IdRecordTable();
        }
        this.tempTable.menuId = MenuDao_1.MenuDao.currentId;
        this.tempTable.foodId = FoodDao_1.FoodDao.currentId;
        JsonVisitor_1.JsonVisitor.WriteToFile(PathHelper_1.PathHelper.GetIdRecordFilePath(), this.tempTable);
    }
}
exports.IdRecordDao = IdRecordDao;
//# sourceMappingURL=IdRecordDao.js.map