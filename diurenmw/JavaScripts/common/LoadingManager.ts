// import { MSingletonPlugin } from "../framework/DI/MContainer";
// import { MObject } from "../framework/Object/MObject";
// import Loading_Generate from "../ui-generate/Loading_generate";


// @MSingletonPlugin()
// export class LoadingManager extends MObject{
//     private loadingUI:LoadingUI = null;
//     private mloadingUI: mw.UIWidget = null;
    
//     init(){
//         // this.mloadingUI = GameObject.findGameObjectById(`19A23787`) as mw.UIWidget;
//         this.loadingUI = LoadingUI.create();
//         this.loadingUI.show();
//     }

//     start(text?:string){
//         if(!this.loadingUI) return;
//         this.setText(text);
//         this.loadingUI.show();
//         this.loadingUI.start();
//         if(this.mloadingUI){
//             this.mloadingUI.destroy();
//             this.mloadingUI = null;
//         }
//     }

//     setText(text:string){
//         if(!this.loadingUI) return;
//         if(text)
//         this.loadingUI.setText(text);
//     }

//     throwErr(text:string){
//         if(!this.loadingUI) return;
//         if(text)
//         this.loadingUI.throwErr(text);
//     }

//     /**0到100 */
//     setProgress(num:number){
//         if(!this.loadingUI) return;
//         if(num > 100) num = 100;
//         if(num < 0) num = 0;
//         this.loadingUI.setProgress(num);
//     }

//     close(text?:string){
//         if(!this.loadingUI) return;

//         if(text) this.setText(text);
//         setTimeout(() => {
//             this.loadingUI.hide();
//             this.loadingUI.close(); 
//         }, 1000); 
//     }
// }

// class LoadingUI extends Loading_Generate{
//     private loadingText:string = "";
//     private Inid:number;
//     private index:number = 0;
//     start(){
//         this.Inid = TimeUtil.setInterval(()=>{
//             let strd = "";
//             if(this.index == 3) this.index = 0;
//             for(let i = 0; i < this.index; i++){
//                 strd += ".";
//             }  
//             this.mloading.text = this.loadingText + strd;
//             this.index++;
//         },0.2);
//     }

//     setText(text:string){
//         this.loadingText = text;
//         this.mloading.text = text;
//     }

//     setProgress(num:number){
//         this.mLoadingBar.currentValue = num/100;
//     }

//     throwErr(text:string){
//         this.mloading.text = text;
//         TimeUtil.clearInterval(this.Inid);
//     }
    
//     close(){
//         TimeUtil.clearInterval(this.Inid);
//     }

//     protected onAwake(): void {
//         super.onAwake();
//         this.layer = mw.UILayerSystem;
//         this.mLoadingBar.currentValue = 0;
//     }
// }