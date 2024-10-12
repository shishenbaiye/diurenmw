export class SkillModuleData extends Subdata{
    @Decorator.persistence()
    normalSkillList: Array<string>;

    @Decorator.persistence()
    skill1: string;

    @Decorator.persistence()
    skill2: string;

    @Decorator.persistence()
    skill3: string;

    @Decorator.persistence()
    skill4: string;

    @Decorator.persistence()
    haveSkills: Array<string>;

    protected onDataInit(): void {
        this.normalSkillList = [];
        this.skill1 = null;
        this.skill2 = null;
        this.skill3 = null;
        this.skill4 = null;
        this.haveSkills = ['GA.Warrior.Whirlwind']
        this.save(true);
    }
}