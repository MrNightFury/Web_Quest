import { Module } from "engine/Modules/Module.ts";

export class InventoryModule extends Module {
    override name = "BaseInventory";

    override async load() {
        this.logger.log("Inventory module loaded");
    }
}