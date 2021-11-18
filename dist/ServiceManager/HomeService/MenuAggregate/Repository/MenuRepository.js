"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRepository = void 0;
class MenuRepository {
    GetCurrentMenu() {
        return this.menu;
    }
    SetCurrentMenu(menuEntity) {
        this.menu = menuEntity;
    }
}
exports.MenuRepository = MenuRepository;
