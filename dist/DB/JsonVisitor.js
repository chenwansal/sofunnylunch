"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonVisitor = void 0;
const fs_1 = require("fs");
class JsonVisitor {
    static ReadJsonFromFileAsync(filePath, callback) {
        fs_1.readFile(filePath, (err, data) => {
            let jsonStr = data.toString();
            let json = JSON.parse(jsonStr);
            callback(json);
        });
    }
    static ReadJsonFromFile(filePath) {
        let data = fs_1.readFileSync(filePath);
        let jsonStr = data.toString();
        let json = JSON.parse(jsonStr);
        return json;
    }
    static WriteToFileAsync(filePath, json, callback) {
        let jsonStr = JSON.stringify(json);
        fs_1.writeFile(filePath, jsonStr, () => {
            callback();
        });
    }
    static WriteToFile(filePath, json) {
        let jsonStr = JSON.stringify(json);
        fs_1.writeFileSync(filePath, jsonStr);
    }
}
exports.JsonVisitor = JsonVisitor;
//# sourceMappingURL=JsonVisitor.js.map