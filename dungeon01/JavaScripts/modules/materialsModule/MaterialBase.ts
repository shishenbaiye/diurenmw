import { GameConfig } from "../../configs/GameConfig";
import { Constructor, MPlugin } from "../../framework/DI/MContainer";
import { MFramework } from "../../framework/MFramework";
import { MObject } from "../../framework/Object/MObject";
import { MathTool } from "../../tools/MathTool";
import { UuidCreater } from "../../tools/UuidCreater";
import { PlayerAttributeSet } from "../AttributeModule/PlayerAttributeSet";
import { MaterialData } from "./MaterialData";
import { MaterialManager } from "./MaterialManager";

@MPlugin()
export abstract class MaterialBase extends MObject{
    /**持有者 */
    owner:Player;
    /**持有者属性 */
    ownerAttribute:PlayerAttributeSet;

    /**材料的uuid */
    public uuid:string;
    /**材料id */
    abstract id:number;
    // 物品数量
    num : number;
    // 品级
    private quality:number;

    public model:Model;

    initByData(data:MaterialData):void{
        this.uuid = data.uuid;
        this.id = data.id;
        this.useEffet1 = data.useEffet1;
        this.useEffet2 = data.useEffet2;
        this.useEffet3 = data.useEffet3;
        this.useEffet4 = data.useEffet4;
    }

    init(){
        let MaterialConfig = GameConfig.MaterialsObj.getElement(this.id);
        this.quality = MaterialConfig.quality;
    }

    async use(inNum : number){
        for(let i = 0; i < inNum; ++i) {
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
        }
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
    getData():MaterialData{
        let data = new MaterialData();
        data.uuid = this.uuid;
        data.id = this.id;
        data.num = this.num;

        data.useEffet1 = this.useEffet1;
        data.useEffet2 = this.useEffet2;
        data.useEffet3 = this.useEffet3;
        data.useEffet4 = this.useEffet4;
        return data;
    }
}