import { MenuDao } from "../../../DB/Dao/Menu/MenuDao";
import { DateHelper } from "../../../Util/DateHelper";
import { HomeMenuCao } from "../Repository/HomeMenuCao";

export class HomeResetTodayMenuService {

    lastDay: number;

    menuDao: MenuDao;
    homeMenuCao: HomeMenuCao;

    constructor() {
        this.lastDay = -1;
    }

    Inject(menuDao: MenuDao, homeMenuCao: HomeMenuCao) {
        this.menuDao = menuDao;
        this.homeMenuCao = homeMenuCao;
    }

    Init() {
        setInterval(() => {
            let today = new Date().getDay();
            if (this.lastDay != today) {
                this.menuDao.ResetTodayMenu();
                this.homeMenuCao.SetCachedMenuDto(undefined);
                this.lastDay = today;
            }
        }, 1000);
    }

}