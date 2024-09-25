import { ArmorData } from "./ArmorData";
import { ArmorPart } from "./ArmorType";

export class ArmorModuleData extends Subdata{
    @Decorator.persistence()
    equipedHead: string;

    @Decorator.persistence()
    equipedBody: string;

    @Decorator.persistence()
    equipedLeg: string;

    @Decorator.persistence()
    equipedFoot: string;

    @Decorator.persistence()
    haveArmorList: Array<ArmorData>;

    protected initDefaultData(): void {
        this.equipedHead = null;
        this.equipedBody = null;
        this.equipedLeg = null;
        this.equipedFoot = null;
        this.haveArmorList = new Array<ArmorData>();
        this.save(true);
    }

    addArmor(armor: ArmorData): void {
        if(!armor) return;
        this.haveArmorList.push(armor);
        this.save(true);
    }

    removeArmor(uuId: string): boolean {
        for (let i = 0; i < this.haveArmorList.length; i++) {
            if (this.haveArmorList[i].uuid === uuId) {
                this.haveArmorList.splice(i, 1);
                this.save(true);
                return;
            }
        }
    }

    equipArmor(uuId: string): void {
        let armor = this.getArmorData(uuId);
        if(!armor) return;
        switch (armor.aPid) {
            case 1:
                this.equipedHead = uuId;
                break;
            case 2:
                this.equipedBody = uuId;
                break;
            case 3:
                this.equipedLeg = uuId;
                break;
            case 4:
                this.equipedFoot = uuId;
                break;
        }
        this.save(true);
    }


    /**
     * 
     * @param part 1.头盔 2.上衣 3.下装 4.鞋子
     */
    unEquipArmor(part: number): void {
        switch (part) {
            case 1:
                this.equipedHead = null;
                break;
            case 2:
                this.equipedBody = null;
                break;
            case 3:
                this.equipedLeg = null;
                break;
            case 4:
                this.equipedFoot = null;
                break;
        }
        this.save(true);
    }
    /**
     * 
     * @param part 1.头盔 2.上衣 3.下装 4.鞋子
     * @returns 
     */
    getEquipedArmor(part:ArmorPart):ArmorData{
        switch (part) {
            case 1:
                return this.getArmorData(this.equipedHead);
            case 2:
                return this.getArmorData(this.equipedBody);
            case 3:
                return this.getArmorData(this.equipedLeg);
            case 4:
                return this.getArmorData(this.equipedFoot);
        }
    }

    getArmorData(uuId: string): ArmorData {
        if(!uuId) return null;
        for (let i = 0; i < this.haveArmorList.length; i++) {
            if (this.haveArmorList[i].uuid === uuId) {
                return this.haveArmorList[i];
            }
        }
        return null;
    }
}