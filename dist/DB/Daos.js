"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Daos = void 0;
class Daos {
    static Inject(menuDao, foodDao, commentDao) {
        Daos._menuDao = menuDao;
        Daos._foodDao = foodDao;
        Daos._commentDao = commentDao;
    }
    static get MenuDao() {
        return Daos._menuDao;
    }
    static get FoodDao() {
        return Daos._foodDao;
    }
    static get CommentDao() {
        return Daos._commentDao;
    }
}
exports.Daos = Daos;
//# sourceMappingURL=Daos.js.map