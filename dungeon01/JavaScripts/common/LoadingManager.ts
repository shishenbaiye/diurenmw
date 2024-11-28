import { MSingletonPlugin } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";
import MaskLoading_Generate from "../ui-generate/Common/MaskLoading_generate";


@MSingletonPlugin()
export class LoadingManager extends MObject{
    private mloadingUI:MaskLoadingUI = null;
    private mloadingCount:number = 0;
    init(){
        if(SystemUtil.isServer()) return;
        this.mloadingUI = UIService.create(MaskLoadingUI);
    }
    private isShowMaskLoading:boolean = false;
    showMaskLoading(){
        this.mloadingCount++;
        if(this.isShowMaskLoading) return;
        this.isShowMaskLoading = true;
        UIService.showUI(this.mloadingUI);
    }

    hideMaskLoading(){
        this.mloadingCount--;
        if(this.mloadingCount <= 0){
            this.mloadingCount = 0;
            this.isShowMaskLoading = false;
            UIService.hideUI(this.mloadingUI);
        }
    }
}

class MaskLoadingUI extends MaskLoading_Generate{

    protected onAwake(): void {
        super.onAwake();
        this.layer = mw.UILayerSystem;
    }
}