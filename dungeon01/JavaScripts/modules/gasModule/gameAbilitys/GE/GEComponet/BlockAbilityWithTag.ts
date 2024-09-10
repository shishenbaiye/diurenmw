import { AbilitySystemComponent } from "../../ASC/AbilitySystemComponent";
import { GameEffectComponent } from "../GameEffectComponent";

export class BlockAbilityWithTag extends GameEffectComponent{

    /**
     * 创建一个BlockAbilityWithTag
     * @param blockTags 
     * @returns 
     */
    static create(blockTags:string[]): BlockAbilityWithTag {
        let instance = new BlockAbilityWithTag();
        instance.blockTags = blockTags;
        instance.init();
        return instance;
    }

    /**锁定的tags */
    blockTags:string[];

    init(): void {
        
    }
    canApply(context:{sourceASC:AbilitySystemComponent,targetASC:AbilitySystemComponent}): boolean {
        return true;
    }

    active(context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): void {
        console.log(`添加BlockAbilityWithTag`,this.blockTags);
        if(context.targetASC){
            if(this.blockTags){
                this.blockTags.forEach((tag)=>{
                    context.targetASC.blockTag.addTag(tag);
                })
            }
        }
    }

    end(context: { sourceASC: AbilitySystemComponent; targetASC: AbilitySystemComponent; }): void {
        console.log(`移除BlockAbilityWithTag`,this.blockTags);
        if(context.targetASC){
            if(this.blockTags){
                this.blockTags.forEach((tag)=>{
                    if(context.targetASC.blockTag.hasTag(tag)){
                        context.targetASC.blockTag.removeTag(tag);
                    }
                })
            }
        }
    }
    update(dt: number): void {
        
    }
}