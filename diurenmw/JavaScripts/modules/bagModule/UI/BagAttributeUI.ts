
import { GameEventBus } from "../../../common/eventBus/EventBus";
import { GameConfig } from "../../../configs/GameConfig";
import BagAttributeUI_Generate from "../../../ui-generate/Bag/BagAttributeUI_generate";
import { PlayerAttributeSet } from "../../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";


@UIBind('UI/Bag/BagAttributeUI.ui')
export default class BagAttributeUI extends BagAttributeUI_Generate {
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		console.log("BagAttributeUI onAwake"); 
		GameEventBus.on("AttributeModule_Change", this.onChangeAttribute.bind(this));
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {

	}

	protected OnDestory() {
	}

	init(inPlayerAttributeSet : PlayerAttributeSet) : void {
		this.changeLevel(inPlayerAttributeSet.level.getCurrent());
		this.changeEXP(inPlayerAttributeSet.exp.getCurrent());
		this.changeHp(inPlayerAttributeSet.hp.getCurrent());
		this.changeMaxHp(inPlayerAttributeSet.maxHp.getCurrent());
		this.changeMp(inPlayerAttributeSet.mp.getCurrent());
		this.changeMaxMp(inPlayerAttributeSet.maxMp.getCurrent());
		this.changeStr(inPlayerAttributeSet.str.getCurrent());
		this.changeInt(inPlayerAttributeSet.int.getCurrent());
		this.changeVit(inPlayerAttributeSet.vit.getCurrent());
		this.changeAtk(inPlayerAttributeSet.atk.getCurrent());
		this.changeMAtk(inPlayerAttributeSet.magicAtk.getCurrent());
		this.changeDef(inPlayerAttributeSet.def.getCurrent());
		this.changeSkillDamage(inPlayerAttributeSet.skillDamage.getCurrent());
		this.changeDamage(inPlayerAttributeSet.damage.getCurrent());
		this.changeCrit(inPlayerAttributeSet.crit.getCurrent());
		this.changeCritDamage(inPlayerAttributeSet.critDamage.getCurrent());
	}

	onChangeAttribute(attrName:string,value:number,ownerId:string) {
        switch(attrName){
            case "level":
                this.changeLevel(value);
                break;
            case "exp":
                this.changeEXP(value);
                break;
            case "hp":
                this.changeHp(value);
                break;
            case "maxHp":
                this.changeMaxHp(value);
                break;
            case "mp":
                this.changeMp(value);
                break;
            case "maxMp":
                this.changeMaxMp(value);
                break;
            case "str":
                this.changeAtk(value);
                break;
            case "int":
				this.changeInt(value);
                break;
            case "vit":
                this.changeVit(value);
                break;
            case "atk":
                this.changeAtk(value);
                break;
            case "matk":
                this.changeMAtk(value);
                break;
            case "def":
                this.changeDef(value);
                break;
            case "skillDamage":
                this.changeSkillDamage(value);
                break;
            case "damage":
				this.changeDamage(value);
                break;
            case "crit":
                this.changeCrit(value);
                break;
            case "critDamage":
                this.changeCritDamage(value);
                break;
            default:
                console.error(`未知属性：${attrName}`);
        }
    }

	changeLevel(level: number){
		this.mLevel.text = `${level}`;
		let excelData = GameConfig.PlayerLevelAttribute.getElement(level)
		this.changeMaxEXP(excelData.exp);
	}

	private maxEXP:number = 0;
    changeMaxEXP(value:number){
        this.maxEXP = value;
        this.mEXPValue.text = `${this.EXP}/${this.maxEXP}`;
        this.mEXP.currentValue = this.EXP/this.maxEXP;
    }

	private maxHp:number = 0;
    changeMaxHp(value:number){
        this.maxHp = value;
        this.mHpValue.text = `${this.hp}/${this.maxHp}`;
        this.mHp.currentValue = this.hp/this.maxHp;
    }

    private maxMP:number = 0;
    changeMaxMp(value:number){
        this.maxMP = value;
        this.mMpValue.text = `${this.mp}/${this.maxMP}`;
        this.mMp.currentValue = this.mp/this.maxMP;
    }

	private EXP:number = 0;
    changeEXP(value:number){
        this.EXP = value;
        this.mEXPValue.text = `${this.EXP}/${this.maxEXP}`;
        this.mEXP.currentValue = this.EXP/this.maxEXP;
    }

    private hp:number = 0;
    changeHp(value:number){
        this.hp = value;
        this.mHpValue.text = `${this.hp}/${this.maxHp}`;
        this.mHp.currentValue = this.hp/this.maxHp;
    }

    private mp:number = 0;
    changeMp(value:number){
        this.mp = value;
        this.mMpValue.text = `${this.mp}/${this.maxMP}`;
        this.mMp.currentValue = this.mp/this.maxMP;
    }

	changeStr(value:number) {
		this.mStr.text = `${value}`;
	}

	changeInt(value:number) {
		this.mInt.text = `${value}`;
	}

	changeVit(value:number) {
		this.mVit.text = `${value}`;
	}

	changeAtk(value:number) {
		this.mAtk.text = `${value}`;
	}

	changeMAtk(value:number) {
		this.mMAtk.text = `${value}`;
	}

	changeDef(value:number) {
		this.mDef.text = `${value}`;
	}

	changeSkillDamage(value:number) {
		this.mSkillDamage.text = `${(value-1)*100}%`;
	}

	changeDamage(value:number) {
		this.mDamage.text = `${(value-1)*100}%`;
	}

	changeCrit(value:number) {
		this.mCrit.text = `${(value)*100}%`;
	}

	changeCritDamage(value:number) {
		this.mCritDamage.text = `${(value-1)*100}%`;
	}
}
 