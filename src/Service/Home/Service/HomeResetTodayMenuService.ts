import { MenuDao } from "../../../DB/Dao/Menu/MenuDao";
import { DateHelper } from "../../../Util/DateHelper";

export class HomeResetTodayMenuService {

    lastDay: number;

    menuDao: MenuDao;

    constructor() {
        this.lastDay = -1;
    }

    Inject(menuDao: MenuDao) {
        this.menuDao = menuDao;
    }

    Init() {
        setInterval(() => {
            let today = new Date().getDay();
            if (this.lastDay != today) {
                this.menuDao.ResetTodayMenu();
                this.lastDay = today;
            }
        }, 1000 * 60);
    }

}