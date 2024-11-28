

export type eventCondition = (inState : PlayerAnimationState)=>boolean;

export class PlayerAnimationState {
    character : Character;
    // 是否装备重剑
    private mIsEquipWeaponOfSword = false;
    // 是否装备法杖
    private mIsEquipWeaponOfStaff = false;
    get isEquipWeaponOfSword() {
        return this.mIsEquipWeaponOfSword;
    }
    set isEquipWeaponOfSword(inIsEquipWeaponOfSword : boolean) {
        this.mIsEquipWeaponOfSword = inIsEquipWeaponOfSword;
        console.log(`PlayerAnimationState update, isEquipWeaponOfSword : ${inIsEquipWeaponOfSword}`);
    }

    get isEquipWeaponOfStaff() {
        return this.mIsEquipWeaponOfStaff;
    }

    set isEquipWeaponOfStaff(inIsEquipWeaponOfStaff : boolean) {
        this.mIsEquipWeaponOfStaff = inIsEquipWeaponOfStaff;
        console.log(`PlayerAnimationState update, isEquipWeaponOfStaff : ${inIsEquipWeaponOfStaff}`);
    }
};