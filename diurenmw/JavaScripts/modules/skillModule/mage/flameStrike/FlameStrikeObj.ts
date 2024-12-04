import { MPlugin, MPropertiesInject } from "../../../../framework/DI/MContainer";
import { MObject } from "../../../../framework/Object/MObject";
import { EffectTool } from "../../../../tools/EffectTool";
import { MathTool } from "../../../../tools/MathTool";
import { AbilitySystemComponent } from "../../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { GA_Mage_FlameStrike } from "./GA_Mage_FlameStrike";
import { GE_Damage_Mage_FlameStrike } from "./GE_Damage_Mage_FlameStrike";

@MPlugin()
export class FlameStrikeObj extends MObject {
    private owner: Character;
    private ownerAsc: AbilitySystemComponent
    private pos: Vector
    private gameAbility: GA_Mage_FlameStrike
    init(pos: Vector, owner: Character, ownerAsc: AbilitySystemComponent, ownerGA: GA_Mage_FlameStrike) {
        this.owner = owner;
        this.ownerAsc = ownerAsc;
        this.pos = pos.clone();
        this.gameAbility = ownerGA;
    }

    
    @MPropertiesInject(EffectTool)
    private effectTool: EffectTool;

    private effectid: number
    public activate() {
        this.effectid = EffectService.playAtPosition("157119", this.pos, { loopCount: 0, scale: new Vector(3) });
        setTimeout(() => {
            this.boom()
            this.cancel();
        }, 1000);
    }

    private boom() {
        this.effectTool.playAtPosition("130642", this.pos, { scale: new Vector(3.5,3.5,3),color:new LinearColor(1,74/255,0) });
        // setTimeout(() => {
            EffectService.stop(this.effectid);
            let arr = MathTool.checkHitByPosition(this.owner, this.pos, 450);
            arr.forEach((char) => {
                let asc = char.getComponent(AbilitySystemComponent);
                if (asc) {
                    if (asc.hasMatchingGameTag(this.gameAbility.targetBlockedTags)) return
                    this.gameAbility.sendGameEvent(this.owner, "Event.Player.HurtMonster", { target: char });
                    this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurtAnim", { onHurtType: "Crit", duringTime: 0.5 });
                    this.gameAbility.sendGameEvent(char, "Event.Monster.OnHurt", { damageGE: GE_Damage_Mage_FlameStrike });
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