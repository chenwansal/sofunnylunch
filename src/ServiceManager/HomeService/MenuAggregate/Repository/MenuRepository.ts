import { MenuEntity } from "../MenuEntity";

export class MenuRepository {

    menu: MenuEntity;

    GetCurrentMenu(): MenuEntity {
        return this.menu;
    }

    SetCurrentMenu(menuEntity: MenuEntity): void {
        this.menu = menuEntity;
    }

}