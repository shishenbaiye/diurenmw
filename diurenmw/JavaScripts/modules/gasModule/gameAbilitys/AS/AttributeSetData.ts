import { AttributeSet } from "./AttributeSet";

@Serializable
export class AttributeSetData { 
    constructor(id:string, name: string, initValue: number) {
        this.ownerGameObjectId = id;
        this.currentValue = initValue;
        this.baseValue = initValue;
        this.name = name;
    }
    ownerAs:AttributeSet;
    @Property({ replicated: true })
    public ownerGameObjectId:string
    @Property({ replicated: true })
    public name: string;
    @Property({ replicated: true })
    private currentValue: number;
    @Property({ replicated: true })
    private baseValue: number;
    getCurrent(): number {
        return this.currentValue;
    }

    setCurrent(value: number) {
        this.ownerAs.preAttributeChange(this, value);
        let oldValue = this.currentValue;
        this.currentValue = value; 
        this.ownerAs.postAttributeChange(this, oldValue, value);
    }

    getBase(): number {
        return this.baseValue;
    }

    setBase(value: number) {
        this.baseValue = value;
    }

    getOwnerId():string{
        return this.ownerGameObjectId;
    }

    add(value: number) {
        this.setCurrent(this.getCurrent() + value);
    }

    sub(value: number) {
        this.setCurrent(this.getCurrent() - value);
    }
}