"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodDao = void 0;
const PathHelper_1 = require("../../../Util/PathHelper");
const JsonVisitor_1 = require("../../JsonVisitor");
const FoodTable_1 = require("../../Table/FoodTable");
const fs_1 = require("fs");
class FoodDao {
    Init() {
        this.allFood = this.GetAllFood();
    }
    GetAllFood() {
        if (this.allFood != null) {
            return this.allFood;
        }
        let dir = PathHelper_1.PathHelper.GetJsonDBFoodDir();
        let files = fs_1.readdirSync(dir);
        let res = [];
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let food = JsonVisitor_1.JsonVisitor.ReadJsonFromFile(dir + "/" + file);
            res.push(food);
        }
        return res;
    }
    GetFoodWithName(name) {
        if (this.allFood != null) {
            return this.allFood.find(value => value.name == name);
        }
    }
    GetFood(id) {
        if (this.allFood != null) {
            return this.allFood.find(value => value.id == id);
        }
        let path = PathHelper_1.PathHelper.GetJsonDBFoodDir() + id + ".json";
        let foodTable = JsonVisitor_1.JsonVisitor.ReadJsonFromFile(path);
        return foodTable;
    }
    AddFoodWithName(foodName) {
        let exist = this.GetFoodWithName(foodName);
        if (exist) {
            return exist.id;
        }
        let lastFood = this.allFood[this.allFood.length - 1];
        let newId = lastFood.id + 1;
        let food = new FoodTable_1.FoodTable();
        food.id = newId;
        food.name = foodName;
        food.supplier = "";
        this.AddFood(food);
        return newId;
    }
    AddFood(foodTable) {
        if (this.allFood != null) {
            this.allFood.push(foodTable);
        }
        let path = PathHelper_1.PathHelper.GetJsonDBFoodDir() + foodTable.id + ".json";
        JsonVisitor_1.JsonVisitor.WriteToFile(path, foodTable);
    }
    AddFoods(foodTables) {
        for (let i = 0; i < foodTables.length; i += 1) {
            this.AddFood(foodTables[i]);
        }
    }
}
exports.FoodDao = FoodDao;
//# sourceMappingURL=FoodDao.js.map