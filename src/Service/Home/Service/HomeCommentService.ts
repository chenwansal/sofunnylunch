import { HttpServer } from "jackwebutil";

export class HomeCommentService {

    http: HttpServer;

    constructor() {}

    Inject(http: HttpServer) {
        this.http = http;
    }

    Init() {
        this.http.PostListen("/Comment", (req, res) => {
            
            let json = req.body.data;
            if (!json) {
                res.json({
                    state: -1
                });
                return;
            }

            console.log(json)
            console.log(req.ip)
        });
    }

}