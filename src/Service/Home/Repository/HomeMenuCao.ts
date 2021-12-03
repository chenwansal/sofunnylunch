import { MenuDto } from "../Service/HomeLoadMenuService";

export class HomeMenuCao {

    menuDto: MenuDto;

    constructor() {}

    GetCachedMenuDto(): MenuDto {
        return this.menuDto;
    }

    SetCachedMenuDto(menuDto: MenuDto): void {
        this.menuDto = menuDto;
    }

}