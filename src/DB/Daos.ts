import { CommentDao } from "./Dao/Comment/CommentDao";
import { FoodDao } from "./Dao/Food/FoodDao";
import { MenuDao } from "./Dao/Menu/MenuDao";

export class Daos {

    private static _menuDao: MenuDao;
    private static _foodDao: FoodDao;
    private static _commentDao: CommentDao;

    static Inject(menuDao: MenuDao, foodDao: FoodDao, commentDao: CommentDao): void {
        Daos._menuDao = menuDao;
        Daos._foodDao = foodDao;
        Daos._commentDao = commentDao;
    }

    public static get MenuDao() : MenuDao {
        return Daos._menuDao;
    }

    public static get FoodDao() : FoodDao {
        return Daos._foodDao;
    }

    public static get CommentDao() : CommentDao {
        return Daos._commentDao;
    }

}