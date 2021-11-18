import { FoodTable } from "../../Table/FoodTable";

export interface IFoodDao {
    CachingAllFood(): void;
    GetAllFood(): FoodTable[];
    GetFood(id: number): FoodTable;
    AddFood(foodTable: FoodTable): void;
    AddFoods(foodTables: FoodTable[]): void;
}