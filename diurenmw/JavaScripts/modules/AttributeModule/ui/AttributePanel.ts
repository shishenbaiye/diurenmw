import MainAttributeUI_Generate from "../../../ui-generate/Attribute/MainAttributeUI_generate";

export class AttributePanel extends MainAttributeUI_Generate{

    private maxHp:number = 0;
    changeMaxHp(value:number){
        this.maxHp = value;
        this.hpText.text = `${this.hp}/${this.maxHp}`;
        this.mHp.currentValue = this.hp/this.maxHp;
    }

    private maxMP:number = 0;
    changeMaxMp(value:number){
        this.maxMP = value;
        this.mpText.text = `${this.mp}/${this.maxMP}`;
        this.mMp.currentValue = this.mp/this.maxMP;
    }

    private hp:number = 0;
    changeHp(value:number){
        this.hp = value;
        this.hpText.text = `${this.hp}/${this.maxHp}`;
        this.mHp.currentValue = this.hp/this.maxHp;
    }

    private mp:number = 0;
    changeMp(value:number){
        this.mp = value;
        this.mpText.text = `${this.mp}/${this.maxMP}`;
        this.mMp.currentValue = this.mp/this.maxMP;
    }
    
    protected onAwake(): void {
        super.onAwake();
        this.layer = mw.UILayerTop;
    }
}