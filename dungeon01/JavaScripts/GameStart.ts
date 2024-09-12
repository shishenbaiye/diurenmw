import { OdinGame, LogManager } from "odin";
import { MFramework } from "./framework/MFramework";
import { GAModuleS } from "./modules/gasModule/GAModuleS";
import { GAModuleC } from "./modules/gasModule/GAModuleC";
import { PlayerModuleS } from "./modules/PlayerModule/PlayerModuleS";
import { PlayerModuleC } from "./modules/PlayerModule/PlayerModuleC";
import { PlayerModuleData } from "./modules/PlayerModule/PlayerModuleData";
import { GAModuleData } from "./modules/gasModule/GAModuleData";
import { CurrentScence } from "./CurrentScence";


@Component
class GameStart extends OdinGame {

    @mw.Property({ displayName: "数据是否本地" })
    public isLocal = true;

    onStart(): void {
        this.useUpdate = true;
        MFramework.initial(CurrentScence.currentScence);

        DataStorage.setTemporaryStorage(this.isLocal);
        if (mw.SystemUtil.isClient()) {
        }
        super.onStart();
        //输出log是否带odin前缀，以便于和编辑器的log进行区分
        LogManager.instance.firstWithEnable = true;
        //是否打印通信的log
        LogManager.instance.showNet = true;
        let selectedLanguageIndex = 0;
        let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            selectedLanguageIndex = 0;
        }
        if (!!language.match("zh")) {
            selectedLanguageIndex = 1;
        }
        if (!!language.match("ja")) {
            selectedLanguageIndex = 2;
        }
        if (!!language.match("de")) {
            selectedLanguageIndex = 3;
        }
        if (!!language.match("ko")) {
            selectedLanguageIndex = 4;
        }
        // GameConfig.initLanguage(selectedLanguageIndex, (key) => {
        //     let ele = GameConfig.SquareLanguage.getElement(key);
        //     if (ele) {
        //         return ele.Value;
        //     }
        //     return null;
        // });
        //自动修改多语言
        // mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
        //     let key: string = ui.text;
        //     if (key) {
        //         let lan = GameConfig.SquareLanguage.getElement(key);
        //         if (lan) {
        //             ui.text = lan.Value;
        //         }
        //     }
        // });
        this.onRegisterModuleModule();
    }

    onUpdate(dt: number): void {
        mw.TweenUtil.TWEEN.update();
    }

    //实现父类“注册模块”抽象方法
    onRegisterModuleModule(): void {
        // MFramework.registerModule(MallModuleS, MallModuleC, MallData);
        MFramework.registerModule(GAModuleS,GAModuleC,GAModuleData);
        MFramework.registerModule(PlayerModuleS,PlayerModuleC,PlayerModuleData)


        MFramework.enterGame();
    }

    protected onDestroy(): void { }
}

export default GameStart;
