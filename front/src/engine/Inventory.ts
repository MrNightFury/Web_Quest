import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
import { IItem } from "./interfaces/IItem";

export class Inventory {
    selectedItemIndex = -1;
    items: (IItem | null)[] = new Array(null, null, null, null);

    get selectedItem() {
        return this.items[this.selectedItemIndex];
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
                if (this.selectedItemIndex != index) {
                    this.selectedItemIndex = index;
                    $(".itembox").removeClass("selected");
                    $(`#inventory > [data-index=${index}]`).first().addClass("selected");
                } else {
                    this.selectedItemIndex = -1;
                    $(".itembox").removeClass("selected");
                }
            });
        $(`#inventory > [data-index=${index}]`).first().addClass("full").append(sprite);
        return index;
    }

    removeItem(index: number) {
        console.log(index)
        this.items[index] = null;
        $(`#inventory > [data-index=${index}]`).first().removeClass("full").empty();
        if (this.selectedItemIndex == index) {
            this.selectedItemIndex = -1;
            $(".itembox").removeClass("selected");
        }
    }

    hasItem(name: string) {
        for (let item of this.items) {
            if (item?.name == name) {
                return true;
            }
        }
        return false;
    }
}