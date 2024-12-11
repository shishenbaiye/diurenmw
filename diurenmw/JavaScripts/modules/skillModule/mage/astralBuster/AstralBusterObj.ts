import { MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MObject } from "../../../../framework/Object/MObject";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GA_Mage_AstralBuster } from "./GA_Mage_AstralBuster";
import { GE_Damage_Mage_AstralBuster1 } from "./GE_Damage_Mage_AstralBuster1";
import { GE_Damage_Mage_AstralBuster2 } from "./GE_Damage_Mage_AstralBuster2";

@MPlugin()
export class AstralBusterObj extends MObject {
    private owner: Character;
    private ownerAsc: AbilitySystemComponent
    private pos: Vector
    private gameAbility: GA_Mage_AstralBuster
    private obj:GameObject;
    init(pos: Vector, owner: Character, ownerAsc: AbilitySystemComponent, ownerGA: GA_Mage_AstralBuster) {
        this.owner = owner;
        this.ownerAsc = ownerAsc;
        this.pos = pos.clone();
        this.gameAbility = ownerGA;
        GameObject.asyncSpawn("2302E7DC46248255CB5ADDB86B79B178").then((obj)=>{
            this.obj = obj;
        })
    }

    
    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;

    private effectid: number
    public activate() {
        this.effectid = EffectService.playAtPosition("157119", this.pos, { loopCount: 0, scale: new Vector(3) });
        setTimeout(() => {
            this.move()
        }, 1000);
    }


    private move(){
        EffectService.stop(this.effectid);
        this.effectid = null;
        let start = this.owner.worldTransform.position.clone().add(new Vector(0,0,800));
        this.obj.worldTransform.position = start
        this.obj.worldTransform.rotation = Rotation.fromVector(start.clone().subtract(this.pos).clone())
        TimeUtil.onEnterFrame.add(this.checkHit, this);
        this.obj.moveTo(this.pos,2,true,()=>{
            TimeUtil.onEnterFrame.remove(this.checkHit, this);
            this.boom()
            this.cancel();
        })
    }

    private hitArr:GameObject[] = []
    private checkHit(){
        let arr = MathTool.checkHitByPosition(this.owner, this.obj.worldTransform.position, 200);
        arr.forEach((char) => {
            let asc = char.getComponent(AbilitySystemComponent);
            if (asc) {
                if (asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return
                if(this.hitArr.indexOf(char) != -1) return
                this.hitArr.push(char);
                this.gameAbility.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: char });
                this.gameAbility.sendGameEvent(char,"Event.Monster.OnHurtAnim",{duringTime:0.5});
                this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_AstralBuster1 });
            }
        })
    }

    private boom() {
        this.obj.destroy();
        this.obj = null;
        this.effectTool.playAtPosition("163335", this.pos, { scale: new Vector(2,2,1)});
        // setTimeout(() => {
            let arr = MathTool.checkHitByPosition(this.owner, this.pos, 450);
            arr.forEach((char) => {
                let asc = char.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return
                    this.gameAbility.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: char });
                    this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurtAnim", { onHurtType: "Crit", duringTime: 0.5 });
                    this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_AstralBuster2 });
                }
            })
        // }, 200);
    }

    private cancel() {
        if (this.effectid) {
            EffectService.stop(this.effectid);
            this.effectid = null;
        }
    }
}