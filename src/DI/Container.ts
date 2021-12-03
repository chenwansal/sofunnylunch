export class Container {

    private instanceDic: Map<string, any>;

    constructor() {
        this.instanceDic = new Map();
    }

    Set(typeName: string, obj: any): void {
        let exists = this.instanceDic.get(typeName);
        if (exists == null) {
            this.instanceDic.set(typeName, obj);
        } else {
            console.log("已存在 " + typeName);
        }
    }

    Get<T>(typeName: string): T {
        let exists = this.instanceDic.get(typeName);
        if (exists != null) {
            return exists as T;
        } else {
            throw "不存在" + typeName;
        }
    }

}