"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class Container {
    constructor() {
        this.instanceDic = new Map();
    }
    Set(typeName, obj) {
        let exists = this.instanceDic.get(typeName);
        if (exists == null) {
            this.instanceDic.set(typeName, obj);
        }
        else {
            console.log("已存在 " + typeName);
        }
    }
    Get(typeName) {
        let exists = this.instanceDic.get(typeName);
        if (exists != null) {
            return exists;
        }
        else {
            throw "不存在" + typeName;
        }
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map