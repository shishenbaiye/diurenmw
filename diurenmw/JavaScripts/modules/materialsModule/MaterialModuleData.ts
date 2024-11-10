import { MaterialData } from "./MaterialData";

export class MaterialModuleData extends Subdata{
    @Decorator.persistence()
    equipedMaterial: string;

    @Decorator.persistence()
    haveMaterialList: Array<MaterialData>;

    protected initDefaultData(): void {
        this.equipedMaterial = null;
        this.haveMaterialList = new Array<MaterialData>();
        this.save(true);
    }

    findMaterial(inId : number): MaterialData {
        for (let i = 0; i < this.haveMaterialList.length; i++) {
            if (this.haveMaterialList[i].id === inId) {
                return this.haveMaterialList[i];
            }
        }
        return null;
    }

    updateMaterial(inId : number, inNum : number): MaterialData {
        for (let i = 0; i < this.haveMaterialList.length; i++) {
            if (this.haveMaterialList[i].id === inId) {
                this.haveMaterialList[i].num += inNum;
                if(this.haveMaterialList[i].num <= 0){
                    this.haveMaterialList.splice(i, 1);
                    return null;
                }
                return this.haveMaterialList[i];
            }
        }
        this.save(true);
    }

    addMaterial(Material: MaterialData): void {
        if(!Material) return;
        this.haveMaterialList.push(Material);
        this.save(true);
    }

    removeMaterial(uuId: string): boolean {
        for (let i = 0; i < this.haveMaterialList.length; i++) {
            if (this.haveMaterialList[i].uuid === uuId) {
                this.haveMaterialList.splice(i, 1);
                this.save(true);
                return true;
            }
        }
    }

    getMaterialData(uuId: string): MaterialData {
        for (let i = 0; i < this.haveMaterialList.length; i++) {
            if (this.haveMaterialList[i].uuid === uuId) {
                return this.haveMaterialList[i];
            }
        }
        return null;
    }
}