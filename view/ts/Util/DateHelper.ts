
export function SplitDateToYYYYMMDD(dateStr: string): string {
    let yyyy = dateStr.substring(0, 4);
    let mm = dateStr.substring(4, 6);
    let dd = dateStr.substring(6, 8);
    return yyyy + "-" + mm + "-" + dd;
}

export function SplitDateToMMDD(dateStr: string) : string {
    let mm = dateStr.substring(4,6);
    let dd = dateStr.substring(6,8);
    return mm + "-" + dd;
}

export function GetDateStr(date: Date): string {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let monthStr = m < 10 ? "0" + m : m;
    let dayStr = d < 10 ? "0" + d : d;
    return "" + y + monthStr + dayStr;
}