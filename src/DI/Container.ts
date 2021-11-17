import { IContainerInstance } from "../Audit/IContainerInstance";

export class Container {

    private instanceDic: Map<string, IContainerInstance>;

    constructor() {
        this.instanceDic = new Map();
    }

    Set<T extends IContainerInstance>(typeName: string, obj: T): void {
        let exists = this.instanceDic.get(typeName);
        if (exists == null) {
            this.instanceDic.set(typeName, obj);
        } else {
            console.log("已存在 " + typeName);
        }
    }

    Get<T extends IContainerInstance>(typeName: string): T {
        let exists = this.instanceDic.get(typeName);
        if (exists != null) {
            return exists as T;
        } else {
            throw "不存在" + typeName;
        }
    }

}