

export type eventCondition = (inState : PlayerAnimationState)=>boolean;

export class PlayerAnimationState {
    character : Character;
    // 是否装备重剑
    private mIsEquipWeaponOfSword = false;

    get isEquipWeaponOfSword() {
        return this.mIsEquipWeaponOfSword;
    }
    set isEquipWeaponOfSword(inIsEquipWeaponOfSword : boolean) {
        this.mIsEquipWeaponOfSword = inIsEquipWeaponOfSword;
        console.log(`PlayerAnimationState update, isEquipWeaponOfSword : ${inIsEquipWeaponOfSword}`);
    }
};