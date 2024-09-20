export class AttributeModuleData extends Subdata{

    owner:Player;

    @Decorator.persistence()
    /**等级 */
    level: number;

    @Decorator.persistence()
    /**经验 */
    exp: number;

    protected initDefaultData(): void {
        this.level = 1;
        this.exp = 0;
        this.save(true);
    }
}