import { AdministratorEntity } from "./AdministratorEntity";

export class AdministratorFactory {

    constructor() {}

    CreateAdministrator() : AdministratorEntity {
        let entity = new AdministratorEntity();
        return entity;
    }

}