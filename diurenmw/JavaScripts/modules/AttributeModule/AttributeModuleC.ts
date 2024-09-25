import { AttributeModuleS } from "./AttributeModuleS";
import { AttributeModuleData } from "./AttributeModuleData";
import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";
import { AttributePanel } from "./ui/AttributePanel";
import { GameEventBus } from "../../common/eventBus/EventBus";

export class AttributeModuleC extends ModuleC<AttributeModuleS, AttributeModuleData> {
    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;

    private attrUI:AttributePanel = null;

    protected onStart(): void {

        InputUtil.onKeyDown(Keys.I, async () => {
            // z装备
            this.load.showMaskLoading();
            let res = await this.server.net_add();
            if(res){
                this.load.hideMaskLoading();
                console.warn(`添加成功`);
            }
        })

        InputUtil.onKeyDown(Keys.O, async () => {
            // z装备
            this.load.showMaskLoading();
            let res = await this.server.net_OnClick();
            if(res){
                this.load.hideMaskLoading();
                console.warn(`装备成功`);
            }
        })

        InputUtil.onKeyDown(Keys.P, async () => {
            // z装备
            this.load.showMaskLoading();
            let res = await this.server.net_Onclick2();
            if(res){
                this.load.hideMaskLoading();
                console.warn(`装备成功`);
            }
        })
    }

    onChangeAttribute(attrName:string,value:number,ownerId:string){
        // Todo同步给其他模块，用EventBus
        GameEventBus.emit("AttributeModule_Change",attrName,value,ownerId);
        if(ownerId != Player.localPlayer.character.gameObjectId) return;
        if(!this.attrUI){
            this.attrUI = UIService.create(AttributePanel);
            UIService.showUI(this.attrUI);
        }

        switch(attrName){
            case "level":
                this.attrUI.mLevel.text = `${value}`;
                break;
            case "exp":
                this.attrUI.mEXP.text = `${value}`;
                break;
            case "hp":
                this.attrUI.changeHp(value);
                break;
            case "maxHp":
                this.attrUI.changeMaxHp(value);
                break;
            case "mp":
                this.attrUI.changeMp(value);
                break;
            case "maxMp":
                this.attrUI.changeMaxMp(value);
                break;
            case "str":
                this.attrUI.mStr.text = `${value}`;
                break;
            case "int":
                this.attrUI.mInt.text = `${value}`;
                break;
            case "vit":
                this.attrUI.mVit.text = `${value}`;
                break;
            case "atk":
                this.attrUI.mAtk.text = `${value}`;
                break;
            case "matk":
                this.attrUI.mMAtk.text = `${value}`;
                break;
            case "def":
                this.attrUI.mDef.text = `${value}`;
                break;
            case "skillDamage":
                this.attrUI.mSkillDamage.text = `${(value-1)*100}%`;
                break;
            case "damage":
                this.attrUI.mDamage.text = `${(value-1)*100}%`;
                break;
            case "crit":
                this.attrUI.mCrit.text = `${(value)*100}%`;
                break;
            case "critDamage":
                this.attrUI.mCritDamage.text = `${(value-1)*100}%`;
                break;
            default:
                console.error(`未知属性：${attrName}`);
        }
    }
}