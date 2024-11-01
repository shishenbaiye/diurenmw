import { GameEventBus } from "../../common/eventBus/EventBus";
import { AbilitySystemComponent } from "../gasModule/gameAbilitys/ASC/AbilitySystemComponent";
import WeaponScript from "../weaponModule/WeaponScript";




@Component
export class PlayerAnimationMgr extends Script {

    protected onStart(): void {
        this.useUpdate = true;
        this.init();
    }

    private animMove:SubStance;
    private animIdle:SubStance;


    init() {
        console.log(`PlayerAnimationMgr init`);
        GameEventBus.on(`WeaponModule_EquipWeapon`, this.onEquipWeapon.bind(this));
        GameEventBus.on(`WeaponModule_UnEquipWeapon`, this.onUnEquipWeapon.bind(this));

        let char = this.gameObject as Character;

        this.animIdle = char.loadSubStance("303259");
        this.animIdle.blendMode = StanceBlendMode.WholeBody;

        this.animMove = char.loadSubStance("303175");
        this.animIdle.blendMode = StanceBlendMode.WholeBody;

    }



    private isEquipWeaponOfSword = false;


    onEquipWeapon(player: mw.Player) {
        if(player.character.gameObjectId != this.gameObject.gameObjectId) return;
        let weaponScript = player.character.getComponent(WeaponScript);
        if(weaponScript){
            let weapon = weaponScript.getEquipWeapon().getData();
            if(weapon){
                if(weapon.wtid == 1){
                    console.log(`装备了剑`);
                    this.isEquipWeaponOfSword = true;
                }
            }
        }
    }
    onUnEquipWeapon(player: mw.Player) {
        this.isEquipWeaponOfSword = false;
    }

    private ownerAsc:AbilitySystemComponent;
    protected onUpdate(dt: number): void {
        let char = this.gameObject as Character;
        if(!this.ownerAsc){
            this.ownerAsc = char.getComponent(AbilitySystemComponent);
        }
        if(char.isMoving && this.isEquipWeaponOfSword == true ){
            this.animMove?.play();
            return;
        }
        if(!char.isMoving && this.isEquipWeaponOfSword == true ){
            this.animIdle?.play();
            return;
        }
        char.currentSubStance?.stop();

    }
}