import { GameConfig } from "../../configs/GameConfig";
import { Constructor, MPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { MathTool } from "../../tools/MathTool";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { WeaponData } from "./WeaponData";
import { WeaponManager } from "./WeaponManager";

@MPlugin()
export abstract class WeaponBase extends MObject{
    /**持有者 */
    owner:Player;
    /**持有者属性 */
    ownerAttribute:PlayerAttributeSet;

    /**武器的uuid */
    public uuid:string;
    /**武器id */
    abstract wid:number;
    /**武器种类id */
    private wtid:number;
    // 物理攻击
    private atk:number;
    // 魔法攻击
    private matk:number;
    // 力量
    private str:number;
    // 智力
    private int:number;
    // 品级
    private quality:number;

    protected model:Model;

    initByData(data:WeaponData):void{
        this.uuid = data.uuid;
        this.wid = data.wid;
        this.wtid = data.wtid;
        this.atk = data.atk;
        this.matk = data.matk;
        this.str = data.str;
        this.int = data.int;
        this.useEffet1 = data.useEffet1;
        this.useEffet2 = data.useEffet2;
        this.useEffet3 = data.useEffet3;
        this.useEffet4 = data.useEffet4;
    }

    init(){
        let weaponConfig = GameConfig.WeaponObj.getElement(this.wid);
        this.wtid = weaponConfig.type;
        this.atk = MathTool.normalDistribution(weaponConfig.atk[0],weaponConfig.atk[1]);
        this.matk = MathTool.normalDistribution(weaponConfig.matk[0],weaponConfig.matk[1]);
        this.str = weaponConfig.str;
        this.int = weaponConfig.int;
        this.quality = weaponConfig.quality;
    }

    abstract refesh():void;

    async equip(){
        let playerAtk = this.ownerAttribute.atk.getCurrent();
        let playerMatk = this.ownerAttribute.magicAtk.getCurrent();
        let playerStr = this.ownerAttribute.str.getCurrent();
        let playerInt = this.ownerAttribute.int.getCurrent();
        
        this.ownerAttribute.atk.setCurrent(playerAtk + this.atk);
        this.ownerAttribute.magicAtk.setCurrent(playerMatk + this.matk);
        this.ownerAttribute.str.setCurrent(playerStr + this.str);
        this.ownerAttribute.int.setCurrent(playerInt + this.int);

        if(this.useEffet1){
            this.excuteEffet1();
        }
        if(this.useEffet2){
            this.excuteEffet2();
        }
        if(this.useEffet3){
            this.excuteEffet3();
        }
        if(this.useEffet4){
            this.excuteEffet4();
        }

        await this.onModelLoad();
    }

    /**创建武器模型 */
    abstract onModelLoad():Promise<void>;

    unEquip():void{
        let playerAtk = this.ownerAttribute.atk.getCurrent();
        let playerMatk = this.ownerAttribute.magicAtk.getCurrent();
        let playerStr = this.ownerAttribute.str.getCurrent();
        let playerInt = this.ownerAttribute.int.getCurrent();
        
        this.ownerAttribute.atk.setCurrent(playerAtk - this.atk);
        this.ownerAttribute.magicAtk.setCurrent(playerMatk - this.matk);
        this.ownerAttribute.str.setCurrent(playerStr - this.str);
        this.ownerAttribute.int.setCurrent(playerInt - this.int);

        if(this.useEffet1){
            this.unExcuteEffet1();
        }
        if(this.useEffet2){
            this.unExcuteEffet2();
        }
        if(this.useEffet3){
            this.unExcuteEffet3();
        }
        if(this.useEffet4){
            this.unExcuteEffet4();
        }

        if(this.model){
            this.model.destroy();
        }

        //Todo:添加进背包
    }

    // 特殊词条1
    abstract useEffet1:boolean;
    abstract effect1Desc:string;
    abstract excuteEffet1():void;
    abstract unExcuteEffet1():void;
    // 特殊词条2
    abstract useEffet2:boolean;
    abstract effect2Desc:string;
    abstract excuteEffet2():void;
    abstract unExcuteEffet2():void;
    // 特殊词条3
    abstract useEffet3:boolean;
    abstract effect3Desc:string;
    abstract excuteEffet3():void;
    abstract unExcuteEffet3():void;
    // 特殊词条4
    abstract useEffet4:boolean;
    abstract effect4Desc:string;
    abstract excuteEffet4():void;
    abstract unExcuteEffet4():void;

    //生成持久化数据体
    getData():WeaponData{
        let data = new WeaponData();
        data.uuid = this.uuid;
        data.wid = this.wid;
        data.wtid = this.wtid;
        data.atk = this.atk;
        data.matk = this.matk;
        data.str = this.str;
        data.int = this.int;
        data.useEffet1 = this.useEffet1;
        data.useEffet2 = this.useEffet2;
        data.useEffet3 = this.useEffet3;
        data.useEffet4 = this.useEffet4;
        return data;
    }
}