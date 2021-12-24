import { PathHelper } from "../../../Util/PathHelper";
import { JsonVisitor } from "../../JsonVisitor";
import { FoodTable } from "../../Table/FoodTable";
import { readdirSync } from "fs";
import { IdRecordDao } from "../IdRecord/IdRecordDao";

export class FoodDao {

    static currentId: number;

    allFood: FoodTable[];

    Init(): void {
        this.allFood = this.GetAllFood();
    }

    GetAllFood(): FoodTable[] {

        if (this.allFood) {
            return this.allFood;
        }

        let dir = PathHelper.GetJsonDBFoodDir();
        let files = readdirSync(dir);
        let res: FoodTable[] = [];
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let food = JsonVisitor.ReadJsonFromFile<FoodTable>(dir + file);
            res.push(food);
        }
        return res;
    }

    GetFoodWithName(name: string): FoodTable {
        if (this.allFood) {
            return this.allFood.find(value => value.name == name);
        }
    }

    GetFood(id: number): FoodTable {

        if (this.allFood) {
            return this.allFood.find(value => value.id == id);
        }

        let path = PathHelper.GetJsonDBFoodDir() + id + ".json";
        let foodTable = JsonVisitor.ReadJsonFromFile<FoodTable>(path);
        return foodTable;
    }

    AddFoodWithName(foodName: string): FoodTable {

        let exist = this.GetFoodWithName(foodName);

        if (exist) {
            return exist;
        }

        let food = new FoodTable();
        food.id = FoodDao.currentId;
        food.name = foodName;
        food.supplier = "";

        this.WriteFood(food);

        FoodDao.currentId += 1;
        IdRecordDao.WriteId();

        return food;

    }

    private WriteFood(foodTable: FoodTable): void {

        if (this.allFood) {
            this.allFood.push(foodTable);
        }

        let path = PathHelper.GetJsonDBFoodDir() + foodTable.id + ".json";
        JsonVisitor.WriteToFile(path, foodTable);
    }

    private WriteFoods(foodTables: FoodTable[]): void {
        for (let i = 0; i < foodTables.length; i += 1) {
            this.WriteFood(foodTables[i]);
        }
    }

}