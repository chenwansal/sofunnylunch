"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
class AdminService {
    constructor() { }
    Inject(http) {
        this.http = http;
    }
    Init() {
        this.http.GetListen("/admin", (req, res) => {
            res.render("admin.html");
        });
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL1NlcnZpY2UvSG9tZS9TZXJ2aWNlL0FkbWluU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLFlBQVk7SUFJckIsZ0JBQWdCLENBQUM7SUFFakIsTUFBTSxDQUFDLElBQWdCO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3ZDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFmRCxvQ0FlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBTZXJ2ZXIgfSBmcm9tIFwiamFja3dlYnV0aWxcIjtcclxuaW1wb3J0IHsgUGF0aEhlbHBlciB9IGZyb20gXCIuLi8uLi8uLi9VdGlsL1BhdGhIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBZG1pblNlcnZpY2Uge1xyXG5cclxuICAgIGh0dHA6IEh0dHBTZXJ2ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBJbmplY3QoaHR0cDogSHR0cFNlcnZlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHR0cCA9IGh0dHA7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmh0dHAuR2V0TGlzdGVuKFwiL2FkbWluXCIsIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICByZXMucmVuZGVyKFwiYWRtaW4uaHRtbFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==