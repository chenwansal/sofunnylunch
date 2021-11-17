"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorFactory = void 0;
const AdministratorEntity_1 = require("./AdministratorEntity");
class AdministratorFactory {
    constructor() { }
    CreateAdministrator() {
        let entity = new AdministratorEntity_1.AdministratorEntity();
        return entity;
    }
}
exports.AdministratorFactory = AdministratorFactory;
