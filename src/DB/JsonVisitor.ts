import { readFile, readFileSync, writeFile, writeFileSync, existsSync } from "fs"

export class JsonVisitor {

    static ReadJsonFromFileAsync<T>(filePath: string, callback: (json: T) => void): void {
        readFile(filePath, (err, data) => {
            let jsonStr = data.toString();
            let json = JSON.parse(jsonStr);
            callback(json);
        });
    }

    static ReadJsonFromFile<T>(filePath:string): T {
        if (!existsSync(filePath)) {
            return null;
        }
        let data: Buffer = readFileSync(filePath);
        let jsonStr = data.toString();
        let json = JSON.parse(jsonStr);
        return json;
    }

    static WriteToFileAsync(filePath: string, json: any, callback: () => void): void {
        let jsonStr = JSON.stringify(json);
        writeFile(filePath, jsonStr, () => {
            callback();
        });
    }

    static WriteToFile(filePath: string, json:any): void {
        let jsonStr = JSON.stringify(json);
        writeFileSync(filePath, jsonStr);
    }

}