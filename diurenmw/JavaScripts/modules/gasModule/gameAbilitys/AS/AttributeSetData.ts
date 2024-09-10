@Serializable
export class AttributeSetData { 
    constructor(id:string, name: string, initValue: number) {
        this.ownerGameObjectId = id;
        this.currentValue = initValue;
        this.baseValue = initValue;
        this.name = name;
    }
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
        this.currentValue = value; 
    }

    getBase(): number {
        return this.baseValue;
    }

    getOwnerId():string{
        return this.ownerGameObjectId;
    }
}