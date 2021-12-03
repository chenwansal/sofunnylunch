import { PathHelper } from "../../../Util/PathHelper";
import { JsonVisitor } from "../../JsonVisitor";
import { FoodTable } from "../../Table/FoodTable";
import { readdirSync } from "fs";

export class FoodDao {

    allFood: FoodTable[];

    Init(): void {
        this.allFood = this.GetAllFood();
    }

    GetAllFood(): FoodTable[] {

        if (this.allFood != null) {
            return this.allFood;
        }

        let dir = PathHelper.GetJsonDBFoodDir();
        let files = readdirSync(dir);
        let res: FoodTable[] = [];
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let food = JsonVisitor.ReadJsonFromFile<FoodTable>(dir + "/" + file);
            res.push(food);
        }
        return res;
    }

    GetFood(id: number): FoodTable {

        if (this.allFood != null) {
            return this.allFood.find(value => value.id == id);
        }

        let path = PathHelper.GetJsonDBFoodDir() + id + ".json";
        let foodTable = JsonVisitor.ReadJsonFromFile<FoodTable>(path);
        return foodTable;
    }

    AddFood(foodTable: FoodTable): void {

        if (this.allFood != null) {
            this.allFood.push(foodTable);
        }

        let path = PathHelper.GetJsonDBFoodDir() + foodTable.id + ".json";
        JsonVisitor.WriteToFile(path, foodTable);
    }

    AddFoods(foodTables: FoodTable[]): void {
        for (let i = 0; i < foodTables.length; i += 1) {
            this.AddFood(foodTables[i]);
        }
    }

}