export class RequestQueryHelper {

    static IsAdministrator(req: any): boolean {

        let query = req.query;
        if (!query) {
            return false;
        }

        let user = query.user;
        let pwd = query.pwd;
        if (user === "cw" && pwd === "123") {
            return true;
        } else {
            return false;
        }

    }

}