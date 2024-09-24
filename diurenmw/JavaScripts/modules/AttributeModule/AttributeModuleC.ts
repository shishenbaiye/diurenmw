import { AttributeModuleS } from "./AttributeModuleS";
import { AttributeModuleData } from "./AttributeModuleData";
import { LoadingManager } from "../../common/LoadingManager";
import { MPropertiesInject } from "../../framework/DI/MContainer";

export class AttributeModuleC extends ModuleC<AttributeModuleS, AttributeModuleData> {
    @MPropertiesInject(LoadingManager)
    private load:LoadingManager;


    protected onStart(): void {
        InputUtil.onKeyDown(Keys.O, async () => {
            // z装备
            this.load.showMaskLoading();
            let res = await this.server.net_OnClick();
            if(res){
                this.load.hideMaskLoading();
                console.warn(`装备成功`);
            }
        })

        InputUtil.onKeyDown(Keys.P, () => {
            // 添加一把武器
            this.server.net_Onclick2();
        })
    }
}