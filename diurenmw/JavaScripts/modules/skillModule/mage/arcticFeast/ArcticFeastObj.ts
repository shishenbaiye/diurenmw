import { MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MObject } from "../../../../framework/Object/MObject";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { GE_Damage_Mage_ArcticFeast1 } from "./GE_Damage_Mage_ArcticFeast1";


@MPlugin()
export class ArcticFeastObj extends MObject {

    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;
    
    private owner: Character;
    private ownerAsc: AbilitySystemComponent
    private pos: Vector
    private gameAbility: GameAbility

    init(pos: Vector, owner: Character, ownerAsc: AbilitySystemComponent, ownerGA: GameAbility) {
        this.owner = owner;
        this.ownerAsc = ownerAsc;
        this.pos = pos.clone();
        this.gameAbility = ownerGA;
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
    }

    private effectid: number
    private isActivated: boolean = false;
    private iid: number = null;
    public activate() {
        this.effectid = this.effectTool.playAtPosition("152193", this.pos.clone(), { loopCount: 0, scale: new Vector(2)});
        this.iid = setTimeout(() => {
            this.iid = null;
            this.isActivated = true;
        }, 100);
    }

    private deltaTime: number = 0;
    onUpdate(dt:number) {
        if (this.isActivated) {
            if(this.deltaTime > 0.5){
                let arr = MathTool.checkHitByPosition(this.owner, this.pos, 500);
                arr.forEach((char) => {
                    let asc = char.getComponent(AbilitySystemComponent);
                    if (asc) {
                        if (asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return
                        this.gameAbility.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: char });
                        this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_ArcticFeast1 });
                    }
                })
                this.deltaTime = 0;
            }
            this.deltaTime += dt;
        }
    }

    public cancel() {
        if (this.isActivated) {
            if (this.iid) {
                clearTimeout(this.iid);
                this.iid = null;
            }
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            this.effectTool.stopEffect(this.effectid);
            this.isActivated = false;
        }
    }
}