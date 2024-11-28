import { MPlugin } from "../../../../framework/DI/MContainer";
import { MObject } from "../../../../framework/Object/MObject";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GameAbility } from "../../../gasModule/gameAbilitys/GA/GameAbility";
import { GE_Damage_Mage_NormalAttack1 } from "../normalAttack/GE_Damage_Mage_NormalAttack1";

@MPlugin()
export class NightHollowObj extends MObject {

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
        this.effectid = EffectService.playAtPosition("27693", this.pos, { loopCount: 0, scale: new Vector(2) });
        this.iid = setTimeout(() => {
            this.iid = null;
            this.isActivated = true;
        }, 200);
        setTimeout(() => {
            this.cancel();
        }, 5000);
    }

    onUpdate() {
        if (this.isActivated) {
            let arr = MathTool.checkHitByPosition(this.owner, this.pos, 500);
            arr.forEach((char) => {
                let asc = char.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(["Club.Player"])) return
                    char.addImpulse(this.pos.clone().subtract(char.worldTransform.position).normalize().multiply(500), true);
                }
            })
        }
    }

    boom(){
        EffectService.playAtPosition("89080", this.pos, { scale: new Vector(2) });
        let arr = MathTool.checkHitByPosition(this.owner, this.pos, 500);
        console.log(arr)
        arr.forEach((char) => {
            let asc = char.getComponent(AbilitySystemComponent);
            if (asc) {
                if (asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return
                this.gameAbility.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: char });
                this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurtAnim", { onHurtType:"Crit",duringTime:0.5 });
                this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_NormalAttack1 });
            }
        })
    }

    public cancel() {
        if (this.isActivated) {
            this.boom();
            if (this.iid) {
                clearTimeout(this.iid);
                this.iid = null;
            }
            TimeUtil.onEnterFrame.remove(this.onUpdate, this);
            EffectService.stop(this.effectid);
            this.isActivated = false;
        }
    }
}