export class AnimationObj{
    uuid:number;
    currentAnim:Animation;
    owner:Character;
    constructor(owner:Character,uuid:number,anim:Animation){
        this.owner = owner;
        this.uuid = uuid;
        this.currentAnim = anim;
    }


    getData():AnimationData{
        return{
            uuid:this.uuid,
            owner:this.owner.gameObjectId,
            animAsset:this.currentAnim.assetId,
            animSpeed:this.currentAnim.speed,
            animSlot:this.currentAnim.slot,
            animBlendOutTime:this.currentAnim.blendOutTime,
            animBlendInTime:this.currentAnim.blendInTime,
            animLoop:this.currentAnim.loop,
            animStartTime:this.currentAnim.startTime,
        }
    }
}


export type AnimationData = {
    uuid:number,
    owner:string,
    animAsset:string,
    animSpeed:number,
    animSlot:number,
    animBlendOutTime:number,
    animBlendInTime:number,
    animLoop:number,
    animStartTime:number,
}