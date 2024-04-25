import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
import { IItem } from "./interfaces/IItem";

export class Inventory {
    selectetItemIndex = -1;
    items: (IItem | null)[] = new Array(null, null, null, null);

    get selectedItem() {
        return this.items[this.selectetItemIndex];
    }

    addItem(item: IItem) {
        let index = this.items.indexOf(null);
        if (index == -1) {
            return -1;
        }
        this.items[index] = item;
        let sprite = $("<img>")
            .attr("src", Controller.instance.getPackFileAddress(FileType.IMAGE, item.sprite.path))
            .css({
                "width": "100px",
                "height": "100px"
            })
            .on("click", () => {
                if (this.selectetItemIndex != index) {
                    this.selectetItemIndex = index;
                    $(".game_item").removeClass("selected");
                    $(`#inventory > [data-index=${index}]`).first().addClass("selected");
                } else {
                    this.selectetItemIndex = -1;
                    $(".game_item").removeClass("selected");
                }
            });
        $(`#inventory > [data-index=${index}]`).first().addClass("full").append(sprite);
        return index;
    }

    removeItem(index: number) {
        this.items[index] = null;
        $(`#inventory > [data-index=${index}]`).first().removeClass("full").empty();
    }
}