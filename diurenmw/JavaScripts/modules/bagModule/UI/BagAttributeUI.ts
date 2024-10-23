
import { GameEventBus } from "../../../common/eventBus/EventBus";
import { GameConfig } from "../../../configs/GameConfig";
import BagAttributeUI_Generate from "../../../ui-generate/Bag/BagAttributeUI_generate";
import { PlayerAttributeSet } from "../../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";


@UIBind('UI/Bag/BagAttributeUI.ui')
export default class BagAttributeUI extends BagAttributeUI_Generate {
    static instance : BagAttributeUI  = null;

	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		console.log("BagAttributeUI onAwake"); 
	}

	/** 仅在游戏时间对非模板实例调用一次 */
	protected onStart() {
        BagAttributeUI.instance = this;
        BagAttributeUI.changeLevel(BagAttributeUI.level);
        BagAttributeUI.changeMaxEXP(BagAttributeUI.maxEXP);
        BagAttributeUI.changeEXP(BagAttributeUI.EXP);
        BagAttributeUI.changeMaxHp(BagAttributeUI.maxHp);
        BagAttributeUI.changeHp(BagAttributeUI.hp);
        BagAttributeUI.changeMaxMp(BagAttributeUI.maxMP);
        BagAttributeUI.changeMp(BagAttributeUI.mp);
        BagAttributeUI.changeStr(BagAttributeUI.str);
        BagAttributeUI.changeInt(BagAttributeUI.int);
        BagAttributeUI.changeVit(BagAttributeUI.vit);
        BagAttributeUI.changeAtk(BagAttributeUI.atk);
        BagAttributeUI.changeMAtk(BagAttributeUI.mAtk);
        BagAttributeUI.changeDef(BagAttributeUI.def);
        BagAttributeUI.changeSkillDamage(BagAttributeUI.skillDamage);
        BagAttributeUI.changeDamage(BagAttributeUI.damage);
        BagAttributeUI.changeCrit(BagAttributeUI.crit);
        BagAttributeUI.changeCritDamage(BagAttributeUI.crit);
	}

	protected OnDestory() {
        BagAttributeUI.instance = null;
	}

	static onChangeAttribute (attrName:string,value:number,ownerId:string) {
        switch(attrName){
            case "level":
                BagAttributeUI.changeLevel(value);
                break;
            case "exp":
                BagAttributeUI.changeEXP(value);
                break;
            case "hp":
                BagAttributeUI.changeHp(value);
                break;
            case "maxHp":
                BagAttributeUI.changeMaxHp(value);
                break;
            case "mp":
                BagAttributeUI.changeMp(value);
                break;
            case "maxMp":
                BagAttributeUI.changeMaxMp(value);
                break;
            case "str":
                BagAttributeUI.changeAtk(value);
                break;
            case "int":
				BagAttributeUI.changeInt(value);
                break;
            case "vit":
                BagAttributeUI.changeVit(value);
                break;
            case "atk":
                BagAttributeUI.changeAtk(value);
                break;
            case "matk":
                BagAttributeUI.changeMAtk(value);
                break;
            case "def":
                BagAttributeUI.changeDef(value);
                break;
            case "skillDamage":
                BagAttributeUI.changeSkillDamage(value);
                break;
            case "damage":
				BagAttributeUI.changeDamage(value);
                break;
            case "crit":
                BagAttributeUI.changeCrit(value);
                break;
            case "critDamage":
                BagAttributeUI.changeCritDamage(value);
                break;
            default:
                console.error(`未知属性：${attrName}`);
        }
    }

    static level : number = 0;
	static changeLevel(value: number){
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mLevel.text = `${value}`;
        }
		// let excelData = GameConfig.PlayerLevelAttribute.findElement("level", value);
		// BagAttributeUI.changeMaxEXP(excelData.exp);
	}

	static maxEXP : number = 1;
    static changeMaxEXP(value:number){
        this.maxEXP = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mEXPValue.text = `${BagAttributeUI.EXP}/${BagAttributeUI.maxEXP}`;
            BagAttributeUI.instance.mEXP.currentValue = BagAttributeUI.EXP/BagAttributeUI.maxEXP;
        }
    }

	static maxHp:number = 0;
    static changeMaxHp(value:number){
        BagAttributeUI.maxHp = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mHpValue.text = `${BagAttributeUI.hp}/${BagAttributeUI.maxHp}`;
            BagAttributeUI.instance.mHp.currentValue = BagAttributeUI.hp/BagAttributeUI.maxHp;
        }
    }

    static maxMP : number = 0;
    static changeMaxMp(value:number){
        BagAttributeUI.maxMP = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mMpValue.text = `${BagAttributeUI.mp}/${BagAttributeUI.maxMP}`;
            BagAttributeUI.instance.mMp.currentValue = BagAttributeUI.mp/BagAttributeUI.maxMP;
        }
    }

	static EXP:number = 0;
    static changeEXP(value:number){
        BagAttributeUI.EXP = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mEXPValue.text = `${BagAttributeUI.EXP}/${BagAttributeUI.maxEXP}`;
            BagAttributeUI.instance.mEXP.currentValue = BagAttributeUI.EXP/BagAttributeUI.maxEXP;
        }
    }

    static hp:number = 0;
    static changeHp(value:number){
        BagAttributeUI.hp = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mHpValue.text = `${BagAttributeUI.hp}/${BagAttributeUI.maxHp}`;
            BagAttributeUI.instance.mHp.currentValue = BagAttributeUI.hp/BagAttributeUI.maxHp;
        }
    }

    static mp:number = 0;
    static changeMp(value:number){
        BagAttributeUI.mp = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mMpValue.text = `${BagAttributeUI.mp}/${BagAttributeUI.maxMP}`;
            BagAttributeUI.instance.mMp.currentValue = BagAttributeUI.mp/BagAttributeUI.maxMP;
        }
    }

    static str:number = 0;
    static changeStr(value:number){
        BagAttributeUI.str = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mStr.text = `${BagAttributeUI.str}`;
        }
    }

    static int:number = 0;
    static changeInt(value:number){
        BagAttributeUI.int = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mInt.text = `${BagAttributeUI.int}`;
        }
    }

    static vit:number = 0;
    static changeVit(value:number){
        BagAttributeUI.vit = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mVit.text = `${BagAttributeUI.vit}`;
        }
    }

    static atk:number = 0;
    static changeAtk(value:number){
        BagAttributeUI.atk = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mAtk.text = `${BagAttributeUI.atk}`;
        }
    }

    static mAtk:number = 0;
    static changeMAtk(value:number){
        BagAttributeUI.mAtk = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mMAtk.text = `${BagAttributeUI.mAtk}`;
        }
    }

    static def:number = 0;
    static changeDef(value:number){
        BagAttributeUI.def = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mDef.text = `${BagAttributeUI.def}`;
        }
    }

    static skillDamage:number = 0;
    static changeSkillDamage(value:number){
        BagAttributeUI.skillDamage = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mSkillDamage.text = `${(BagAttributeUI.skillDamage-1)*100}%`;
        }
    }

    static damage:number = 0;
    static changeDamage(value:number){
        BagAttributeUI.damage = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mDamage.text = `${(BagAttributeUI.damage-1)*100}%`;
        }
    }

    static crit:number = 0;
    static changeCrit(value:number){
        BagAttributeUI.crit = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mCrit.text = `${(BagAttributeUI.crit)*100}%`;
        }
    }

    static critDamage:number = 0;
    static changeCritDamage(value:number){
        BagAttributeUI.critDamage = value;
        if (BagAttributeUI.instance)
        {
            BagAttributeUI.instance.mCritDamage.text = `${(BagAttributeUI.critDamage-1)*100}%`;
        }
    }
}
 