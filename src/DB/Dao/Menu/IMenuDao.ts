import { MenuTable } from "../../Table/MenuTable";

export interface IMenuDao {
    CachingAllMenu(): void;
    GetTodayMenu(): MenuTable;
    AddMenu(menu: MenuTable): void;
    GetAllMenu(): MenuTable[];
}