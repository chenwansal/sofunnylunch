"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodGo = void 0;
class FoodGo {
    constructor() { }
    Inject(commentModel) {
        this.commentModel = commentModel;
    }
    Init(parent, foodId, foodName, imgSrc) {
        this.foodId = foodId;
        let ele = document.createElement("div");
        ele.className = "food-element";
        let foodBD = document.createElement("div");
        foodBD.className = "food-bd";
        ele.appendChild(foodBD);
        // FOOD
        let foodImg = document.createElement("img");
        foodImg.src = imgSrc;
        foodBD.appendChild(foodImg);
        let foodP = document.createElement("p");
        foodP.innerText = foodName;
        foodBD.appendChild(foodP);
        let commentBD = document.createElement("div");
        commentBD.className = "comment-bd";
        ele.appendChild(commentBD);
        // TAG GROUOP
        let tagGroup = document.createElement("div");
        tagGroup.className = "tag-group";
        commentBD.appendChild(tagGroup);
        let inputTag = document.createElement("input");
        inputTag.className = "input-tag";
        inputTag.type = "text";
        inputTag.placeholder = "可手动输入评价";
        inputTag.onchange = (e) => {
            this.commentModel.content = inputTag.value;
        };
        tagGroup.appendChild(inputTag);
        // LIKE GROUP
        let likeGroup = document.createElement("div");
        likeGroup.className = "like-group";
        commentBD.appendChild(likeGroup);
        let likeBtn = document.createElement("i");
        likeBtn.innerText = "好吃";
        likeBtn.className = "like";
        likeBtn.onclick = (e) => {
            if (this.foodId != this.commentModel.foodId) {
                this.OnCleanAllTag();
            }
            console.log(likeBtn.getAttribute("active"));
            if (likeBtn.getAttribute("active")) {
                this.commentModel.star = -1;
                this.commentModel.foodId = -1;
                likeBtn.removeAttribute("active");
            }
            else {
                this.commentModel.star = 5;
                this.commentModel.foodId = this.foodId;
                likeBtn.setAttribute("active", "1");
                unlikeBtn.removeAttribute("active");
            }
        };
        likeGroup.appendChild(likeBtn);
        let unlikeBtn = document.createElement("i");
        unlikeBtn.className = "unlike";
        unlikeBtn.innerText = "不好吃";
        unlikeBtn.onclick = (e) => {
            if (this.foodId != this.commentModel.foodId) {
                this.OnCleanAllTag();
            }
            if (unlikeBtn.getAttribute("active")) {
                this.commentModel.star = -1;
                this.commentModel.foodId = -1;
                unlikeBtn.removeAttribute("active");
            }
            else {
                this.commentModel.star = 0;
                this.commentModel.foodId = this.foodId;
                unlikeBtn.setAttribute("active", "1");
                likeBtn.removeAttribute("active");
            }
        };
        likeGroup.appendChild(unlikeBtn);
        this.element = ele;
        this.tagGroup = tagGroup;
        parent.appendChild(ele);
    }
    AddTag(tagName) {
        let tag = document.createElement("div");
        tag.className = "tag";
        tag.innerText = tagName;
        tag.onclick = (e) => {
            if (this.foodId != this.commentModel.foodId) {
                this.OnCleanAllTag();
            }
            this.commentModel.foodId = this.foodId;
            let _tagName = tagName;
            let tags = this.commentModel.tags;
            let index = tags.findIndex(value => value == _tagName);
            if (index != -1) {
                tag.removeAttribute("active");
                tags.splice(index, 1);
            }
            else {
                tag.setAttribute("active", "");
                tags.push(_tagName);
            }
        };
        let inputTag = this.tagGroup.lastChild;
        this.tagGroup.insertBefore(tag, inputTag);
    }
}
exports.FoodGo = FoodGo;
//# sourceMappingURL=FoodGo.js.map