import { ConsumableData } from "./ConsumableData";

export class ConsumableModuleData extends Subdata{
    @Decorator.persistence()
    equipedConsumable: string;

    @Decorator.persistence()
    haveConsumableList: Array<ConsumableData>;

    protected initDefaultData(): void {
        this.equipedConsumable = null;
        this.haveConsumableList = new Array<ConsumableData>();
        this.save(true);
    }

    findConsumable(inId : number): ConsumableData {
        for (let i = 0; i < this.haveConsumableList.length; i++) {
            if (this.haveConsumableList[i].id === inId) {
                return this.haveConsumableList[i];
            }
        }
        return null;
    }

    updateConsumable(inId : number, inNum : number): ConsumableData {
        for (let i = 0; i < this.haveConsumableList.length; i++) {
            if (this.haveConsumableList[i].id === inId) {
                this.haveConsumableList[i].num += inNum;
                if(this.haveConsumableList[i].num <= 0){
                    this.haveConsumableList.splice(i, 1);
                    return null;
                }
                return this.haveConsumableList[i];
            }
        }
        this.save(true);
    }

    addConsumable(Consumable: ConsumableData): void {
        if(!Consumable) return;
        this.haveConsumableList.push(Consumable);
        this.save(true);
    }

    removeConsumable(uuId: string): boolean {
        for (let i = 0; i < this.haveConsumableList.length; i++) {
            if (this.haveConsumableList[i].uuid === uuId) {
                this.haveConsumableList.splice(i, 1);
                this.save(true);
                return true;
            }
        }
    }

    getConsumableData(uuId: string): ConsumableData {
        for (let i = 0; i < this.haveConsumableList.length; i++) {
            if (this.haveConsumableList[i].uuid === uuId) {
                return this.haveConsumableList[i];
            }
        }
        return null;
    }
}