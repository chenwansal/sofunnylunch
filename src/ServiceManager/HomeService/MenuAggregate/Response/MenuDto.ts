import { FoodTable } from "../../../../DB/Table/FoodTable";

export class MenuDto {

    id: number;
    yyyymmdd: string;
    foodArr: FoodTable[];

}