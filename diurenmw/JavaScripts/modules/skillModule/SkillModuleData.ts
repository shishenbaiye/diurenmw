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

    protected initDefaultData(): void {
        this.normalSkillList = [];
        this.skill1 = null;
        this.skill2 = null;
        this.skill3 = null;
        this.skill4 = null;
        this.haveSkills = []
        this.save(true);
    }
}