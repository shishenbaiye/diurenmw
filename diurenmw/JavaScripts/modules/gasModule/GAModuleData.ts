export class GAModuleData extends Subdata{

    owner:Player;

    @Decorator.persistence()
    playerName: string;

    @Decorator.persistence()
    /**职业 */
    playerRole: string;

    @Decorator.persistence()
    /**等级 */
    level: number;

    @Decorator.persistence()
    /**经验 */
    exp: number;

    @Decorator.persistence()
    /**血量 */
    hp: number;

    @Decorator.persistence()
    /**最大血量 */
    maxHp: number;

    @Decorator.persistence()
    /**蓝量 */
    mp: number;

    @Decorator.persistence()
    /**最大蓝量 */
    maxMp: number;

    @Decorator.persistence()
    /**物理攻击力 */
    atk: number;

    @Decorator.persistence()
    /**魔法攻击力 */
    magicAtk: number;

    @Decorator.persistence()
    /**防御力 */
    def: number;

    @Decorator.persistence()
    /**速度 */
    spd: number;

    @Decorator.persistence()
    /**暴击率 */
    crit: number;

    @Decorator.persistence()
    /**暴击伤害 */
    critDamage: number;

    protected initDefaultData(): void {
        this.level = 1;
        this.exp = 0;
        this.hp = 100;
        this.maxHp = 100;
        this.mp = 100;
        this.maxMp = 100;
        this.atk = 10;
        this.magicAtk = 10;
        this.def = 100;
        this.spd = 600;
        this.crit = 0.1;
        this.critDamage = 1.5;
        this.save(false);
    }
}