export class DataHelper {

    static GetYYMMDD(): string {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        return y + "-" + m + "-" + d;
    }
    
}