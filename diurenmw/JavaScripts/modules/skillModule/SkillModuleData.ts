export class SkillModuleData extends Subdata{
    @Decorator.persistence()
    normalSkillList: Array<number>;

    @Decorator.persistence()
    skill1: number;

    @Decorator.persistence()
    skill2: number;

    @Decorator.persistence()
    skill3: number;

    @Decorator.persistence()
    skill4: number;

    @Decorator.persistence()
    haveSkills: Array<number>;

    @Decorator.persistence()
    weaponNormalSkillList: Map<string,Array<number>>;

    @Decorator.persistence()
    weaponSkillList: Map<string,Array<number>>

    protected initDefaultData(): void {
        this.normalSkillList = [];
        this.skill1 = -1;
        this.skill2 = -1;
        this.skill3 = -1;
        this.skill4 = -1;
        this.haveSkills = []
        this.weaponNormalSkillList = new Map<string,Array<number>>();
        this.weaponSkillList = new Map<string,Array<number>>();
        this.save(true);
    }
}