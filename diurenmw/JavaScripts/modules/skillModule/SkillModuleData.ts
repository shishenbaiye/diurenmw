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
    skill5: number;

    @Decorator.persistence()
    skillBack: number;

    @Decorator.persistence()
    skillFinal: number;

    @Decorator.persistence()
    haveSkills: Array<number>;

    @Decorator.persistence()
    weaponNormalSkillList: Map<string,Array<number>>;

    @Decorator.persistence()
    weaponSkillList: Map<string,Array<number>>

    @Decorator.persistence()
    weaponFinalSkillList: Map<string,Array<number>>

    @Decorator.persistence()
    weaponBackSkillList: Map<string,number>

    protected initDefaultData(): void {
        this.normalSkillList = [];
        this.skill1 = -1;
        this.skill2 = -1;
        this.skill3 = -1;
        this.skill4 = -1;
        this.skill5 = -1;
        this.skillBack = -1;
        this.skillFinal = -1;
        this.haveSkills = []
        this.weaponNormalSkillList = new Map<string,Array<number>>();
        this.weaponSkillList = new Map<string,Array<number>>();
        this.weaponFinalSkillList = new Map<string,Array<number>>();
        this.weaponBackSkillList = new Map<string,number>();
        this.save(true);
    }
}