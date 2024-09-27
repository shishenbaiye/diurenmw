import { JewelryData } from "./JewelryData";
import { JewelryPart } from "./JewelryType";

export class JewelryModuleData extends Subdata{
    @Decorator.persistence()
    // 装备中的戒指
    equipedRing: string;

    @Decorator.persistence()
    // 装备中的项链
    equipedNecklace: string;

    @Decorator.persistence()
    // 装备中的手镯
    equipedBracelet: string;

    @Decorator.persistence()
    haveJewelryList: Array<JewelryData>;

    protected initDefaultData(): void {
        this.equipedRing = null;
        this.equipedNecklace = null;
        this.equipedBracelet = null;
        this.haveJewelryList = [];
        this.save(true);
    }

    addJewelry(jewelryData: JewelryData): void {
        if(!jewelryData) return;
        this.haveJewelryList.push(jewelryData);
        this.save(true);
    }

    removeJewelry(uuId:string): boolean {
        for(let i = 0; i < this.haveJewelryList.length; i++) {
            if(this.haveJewelryList[i].uuid == uuId) {
                this.haveJewelryList.splice(i, 1);
                this.save(true);
                return true;
            }
        }
        return false;
    }

    getJewelryData(uuId:string): JewelryData {
        if(!uuId) return null;
        for(let i = 0; i < this.haveJewelryList.length; i++) {
            if(this.haveJewelryList[i].uuid == uuId) {
                return this.haveJewelryList[i];
            }
        }
        return null;
    }

    equipJewelry(uuId: string): boolean {
        let jewelryData = this.getJewelryData(uuId);
        if(jewelryData) {
            switch(jewelryData.aPid) {
                case 1:
                    this.equipedRing = uuId;
                    break;
                case 2:
                    this.equipedNecklace = uuId;
                    break;
                case 3:
                    this.equipedBracelet = uuId;
                    break;
            }
            this.save(true);
            return true;
        }
        return false;
    }
    
    unEquipJewelry(part: JewelryPart) {
        switch (part) {
            case 1:
                this.equipedRing = null;
                break;
            case 2:
                this.equipedNecklace = null;
                break;
            case 3:
                this.equipedBracelet = null;
                break;
        }
        this.save(true);
    }
}