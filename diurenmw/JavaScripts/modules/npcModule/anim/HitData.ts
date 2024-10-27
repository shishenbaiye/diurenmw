
/**  攻击信息 */
@Serializable
export class HitInfo {
    @Property({ replicated: true })
    hitIndex: number = 0;

    @Property({ replicated: true })
    skillId: number = 0

    static triggerIndexCounter: number = 0;
    static getIndex() {
        let index = ++HitInfo.triggerIndexCounter;
        if (index >= 32) {
            HitInfo.triggerIndexCounter = 0;
        }
        return index;
    }

    constructor() {
        this.hitIndex = HitInfo.getIndex();
    }
}
