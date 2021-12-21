"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodGo = void 0;
class FoodGo {
    constructor(parent, foodId, foodName, imgSrc) {
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
        // LIKE GROUP
        let likeGroup = document.createElement("div");
        likeGroup.className = "like-group";
        commentBD.appendChild(likeGroup);
        let likeBtn = document.createElement("i");
        likeBtn.innerText = "好吃";
        likeGroup.appendChild(likeBtn);
        let unlikeBtn = document.createElement("i");
        unlikeBtn.innerText = "不好吃";
        likeGroup.appendChild(unlikeBtn);
        this.element = ele;
        this.tagGroup = tagGroup;
        parent.appendChild(ele);
    }
    AddTag(tagName) {
        let tag = document.createElement("div");
        tag.className = "tag";
        this.tagGroup.appendChild(tag);
    }
}
exports.FoodGo = FoodGo;
