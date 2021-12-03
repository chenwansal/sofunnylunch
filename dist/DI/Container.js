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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RJL0NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFNBQVM7SUFJbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELEdBQUcsQ0FBQyxRQUFnQixFQUFFLEdBQVE7UUFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsR0FBRyxDQUFJLFFBQWdCO1FBQ25CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLE1BQVcsQ0FBQztTQUN0QjthQUFNO1lBQ0gsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztDQUVKO0FBMUJELDhCQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb250YWluZXIge1xyXG5cclxuICAgIHByaXZhdGUgaW5zdGFuY2VEaWM6IE1hcDxzdHJpbmcsIGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZURpYyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXQodHlwZU5hbWU6IHN0cmluZywgb2JqOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZXhpc3RzID0gdGhpcy5pbnN0YW5jZURpYy5nZXQodHlwZU5hbWUpO1xyXG4gICAgICAgIGlmIChleGlzdHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlRGljLnNldCh0eXBlTmFtZSwgb2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW3suWtmOWcqCBcIiArIHR5cGVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0PFQ+KHR5cGVOYW1lOiBzdHJpbmcpOiBUIHtcclxuICAgICAgICBsZXQgZXhpc3RzID0gdGhpcy5pbnN0YW5jZURpYy5nZXQodHlwZU5hbWUpO1xyXG4gICAgICAgIGlmIChleGlzdHMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RzIGFzIFQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgXCLkuI3lrZjlnKhcIiArIHR5cGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=