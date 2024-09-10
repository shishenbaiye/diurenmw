// import { LoadingManager } from "./common/LoadingManager";
// import { MContainer } from "./framework/DI/MContainer";

export default class Application extends GameApplication {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onEnter(): void {
        console.log(`hello world`)
        
        // MContainer.instance.getPluginByName<LoadingManager>("LoadingManager").init();

        // SystemUtil.closeLoadingView();
    }
}
