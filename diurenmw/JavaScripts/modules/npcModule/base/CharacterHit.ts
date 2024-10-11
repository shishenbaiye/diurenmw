
@Serializable
export class CharacterHit {
    @Property({ replicated: true })
    hitIndex: number = 0;

    @Property({ replicated: true })
    skillId: number = 0

    static triggerIndexCounter: number = 0;
    static getIndex() {
        let index = ++CharacterHit.triggerIndexCounter;
        if (index >= 32) {
            CharacterHit.triggerIndexCounter = 0;
        }
        return index;
    }

    constructor() {
        this.hitIndex = CharacterHit.getIndex();
    }
}