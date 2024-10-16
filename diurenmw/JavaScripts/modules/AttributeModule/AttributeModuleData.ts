export class AttributeModuleData extends Subdata{

    owner:Player;

    @Decorator.persistence()
    /**等级 */
    _level: number;

    @Decorator.persistence()
    /**经验 */
    _exp: number;

    protected initDefaultData(): void {
        this.level = 1;
        this.exp = 0;
        this.save(true);
    }

    set exp(value:number){
        this._exp = value;
        this.save(true);
    }

    set level(value:number){
        this._level = value;
        this.save(true);
    }

    get exp(){
        return this._exp;
    }

    get level(){
        return this._level;
    }
}