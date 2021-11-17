import { DataHelper } from "../../Util/DateHelper";

export class GeneralService {

    constructor() {

    }

    GetDate(): string {
        return DataHelper.GetYYMMDD();
    }

}