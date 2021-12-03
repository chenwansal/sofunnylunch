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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1NlcnZpY2UvQWRtaW4vQWRtaW5TZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQWEsWUFBWTtJQUlyQixnQkFBZ0IsQ0FBQztJQUVqQixNQUFNLENBQUMsSUFBZ0I7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWZELG9DQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFNlcnZlciB9IGZyb20gXCJqYWNrd2VidXRpbFwiO1xyXG5pbXBvcnQgeyBQYXRoSGVscGVyIH0gZnJvbSBcIi4uLy4uL1V0aWwvUGF0aEhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFkbWluU2VydmljZSB7XHJcblxyXG4gICAgaHR0cDogSHR0cFNlcnZlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIEluamVjdChodHRwOiBIdHRwU2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5odHRwID0gaHR0cDtcclxuICAgIH1cclxuXHJcbiAgICBJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaHR0cC5HZXRMaXN0ZW4oXCIvYWRtaW5cIiwgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcy5yZW5kZXIoXCJhZG1pbi5odG1sXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19