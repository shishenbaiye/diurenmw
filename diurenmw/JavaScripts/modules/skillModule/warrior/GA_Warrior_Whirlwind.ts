import { Constructor, MPlugin } from "../../../framework/DI/MContainer";
import { AbilitySystemComponent } from "../../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import { AT_PlayAnimation } from "../../gasModule/gameAbilitys/AT/customAT/AT_PlayAnimation";
import { GameAbility } from "../../gasModule/gameAbilitys/GA/GameAbility";
import { EGameAbilityTriggerSourceType } from "../../gasModule/gameAbilitys/GA/GameAbilityType";
import { CoolDownByGameEffect } from "../../gasModule/gameAbilitys/GE/GESpecial/CoolDownByGameEffect";
import { RegisterSkill } from "../SkillManager";
import { ESkillType } from "../SkillType";
import { GE_CoolDown_Warrior_Whirlwind } from "./GE_CoolDown_Warrior_Whirlwind";

@RegisterSkill(1001,ESkillType.GreatSword)
@MPlugin()
export class GA_Warrior_Whirlwind extends GameAbility{
    tag: string = "GA.Warrior.Whirlwind";
    cancelTags: string[];
    blockTags: string[];
    activationOwnedTags: string[] = [];
    activationRequiredTags: string[];
    activationBlockedTags: string[];
    targetRequiredTags: string[];
    targetBlockedTags: string[];
    trigger: { tag: string; sourceType: EGameAbilityTriggerSourceType; }[];

    cd: Constructor<CoolDownByGameEffect> = GE_CoolDown_Warrior_Whirlwind;

    protected onPreActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {

    }
    private effect1:number;
    private effect2:number;
    protected onActive(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        let aim = char.loadAnimation("298003");
        aim.blendInTime = 0;
        // aim.blendOutTime = 0;
        AT_PlayAnimation.New(this,aim,3.33,char)
        .addEvent(0.1,()=>{
            this.effect1 = EffectService.playOnGameObject("84942",owner,{scale:new Vector(1.5),slotType:HumanoidSlotType.Root});
            this.effect2 = EffectService.playOnGameObject("123627",owner,{scale:new Vector(1.5),position:new Vector(0,0,-owner.getBoundingBox().z/2)});
        })
        .addEvent(0.2,()=>{
            let res = this.checkHit();
            if(res.length > 0){
                console.log(`res`,res);
                res.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    console.log(`asc`,asc);
                    if(asc){
                        obj.loadAnimation("268673").play();
                        EffectService.playOnGameObject("13595",obj,{scale:new Vector(5)})
                    }
                    
                })
            }
        })
        .addEvent(0.7,()=>{
            let res = this.checkHit();
            if(res.length > 0){
                res.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        obj.loadAnimation("268673").play();
                        EffectService.playOnGameObject("13595",obj,{scale:new Vector(5)})
                    }
                    
                })
            }
        })
        .addEvent(1.2,()=>{
            let res = this.checkHit();
            if(res.length > 0){
                res.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        obj.loadAnimation("268673").play();
                        EffectService.playOnGameObject("13595",obj,{scale:new Vector(5)})
                    }
                    
                })
            }
        })
        .addEvent(1.7,()=>{
            let res = this.checkHit();
            if(res.length > 0){
                res.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        obj.loadAnimation("268673").play();
                        EffectService.playOnGameObject("13595",obj,{scale:new Vector(5)})
                    }
                    
                })
            }
        })
        .addEvent(2.2,()=>{
            let res = this.checkHit();
            if(res.length > 0){
                res.forEach((obj:Character)=>{
                    let asc = obj.getComponent(AbilitySystemComponent);
                    if(asc){
                        obj.loadAnimation("268673").play();
                        EffectService.playOnGameObject("13595",obj,{scale:new Vector(5)})
                    }
                    
                })
            }
        })
        .addEvent(2.5,()=>{
            EffectService.stop(this.effect1);
            char.maxWalkSpeed -= 600;
            char.rotateRate -= 5000;
        })
        .addEvent(3.1,()=>{
            setTimeout(() => {
                this.end();
            }, 300);
        }).activate();
    }
    protected onCancel(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        // throw new Error("Method not implemented.");
    }
    protected onEnd(asc: AbilitySystemComponent, owner: GameObject, target: GameObject): void {
        let char = owner as Character;
        this.effect1 = null;
        char.maxWalkSpeed += 600;
        char.rotateRate += 5000;
    }

    checkHitByDistance(): GameObject[] {
        let owner = this.owner as Character;
        let ownerLocation = owner.worldTransform.position.clone();
        let allPlayer = Player.getAllPlayers();
        let characterArray = [];
        allPlayer.forEach((player) => {
            if (player.character.gameObjectId != owner.gameObjectId) {
                let targetLocation = player.character.worldTransform.position.clone();
                let distance = Vector.distance(ownerLocation, targetLocation);
                if (distance < 150) {
                    let ownerForward = owner.worldTransform.getForwardVector().normalize();
                    let ownerForwardXY = new Vector2(ownerForward.x, ownerForward.y);
                    let ownerToTarget = targetLocation.subtract(ownerLocation).normalize();
                    let ownerToTargetXY = new Vector2(ownerToTarget.x, ownerToTarget.y);
                    let angle = Vector2.angle(ownerForwardXY, ownerToTargetXY);
                    if (angle < 60) {
                        characterArray.push(player.character);
                    }
                }
            }
        })
        return characterArray;
    }

    checkHit(): GameObject[] {
        let vector = this.owner.worldTransform.position.clone()
        let res = QueryUtil.sphereOverlap(vector, 200, true, undefined, false, this.owner);
        let characterArray = []
        for (let i = 0; i < res.length; i++) {
            if (res[i] instanceof Character) {
                characterArray.push(res[i]);
            }
        }
        return characterArray;
    }
}