// // import { GameConfig } from "../configs/GameConfig";
// // import Tips from "../uiMgr/P_Tips";

// import { MContainer, MSingletonPlugin } from "../framework/DI/MContainer";
// import AiTips_Generate from "../ui-generate/AiTips_generate";

// @MSingletonPlugin()
// export class TipsTool{

//     private tipUI:TipsUI = null;

//     show(text:string,funs?:(touch:boolean)=>void){
//         if(!this.tipUI){
//             this.tipUI = MContainer.instance.injectInstance(TipsUI.create());
//         }
//         this.tipUI.open(text,funs);
//     }
// }

// class TipsUI extends AiTips_Generate{

//     private fun:(touch:boolean)=>void = null;

//     open(text:string,funs?:(touch:boolean)=>void){
//         this.mText.text = text;
//         this.fun = funs;
//         this.show();
//     }

//     protected onAwake(): void {
//         super.onAwake();
//         this.layer = mw.UILayerSystem;
//         this.mCancel.onClicked.add(()=>{
//             if(this.fun) this.fun(false);
//             this.hide();
//         })

//         this.mConfirm.onClicked.add(()=>{
//             if(this.fun) this.fun(true);
//             this.hide();
//         })
//     }
// }