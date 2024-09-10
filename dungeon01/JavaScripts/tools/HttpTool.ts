import { MSingletonPlugin } from "../framework/DI/MContainer";
import { GameGlobal } from "../globel/GameGlobel";


// @GameGlobal.AutoInit
@MSingletonPlugin()
export class HttpTool {
    private func:(result:boolean,url:string)=>void = null;
    initSelf() {
        // UE.MWHttpForTs.Instance().NotifyUploadOss.Add((dataString:string)=>{
        //     console.warn(`ossImageUrl`,dataString);
        //     this.allowUpload = true;
        //     if(this.func){
        //         let realUrl = dataString;
        //         this.func(true,realUrl);
        //         this.func = null;
        //     }
        // })
    }


    public async get(apiParam:string, body?: any):Promise<{result: boolean, content: string, responseCode: number}> {
        return new Promise((resolve) => {
            mw.generalHttpRequest((result: boolean, content: string, responseCode: number)=>{
                resolve({result,content,responseCode});
            },HttpRequestURL.CobblestoneService,apiParam,body,HttpRequestType.Get);
        });
    }


    public async post(apiParam:string, body?: any): Promise<{result: boolean, content: string, responseCode: number}> {
        return new Promise((resolve) => {
            mw.generalHttpRequest((result: boolean, content: string, responseCode: number)=>{
                resolve({result,content,responseCode});
            },HttpRequestURL.CobblestoneService, apiParam,body,HttpRequestType.Post);
        });
    }

    private allowUpload:boolean = true;

    /**获取图片在oss的url地址 */
    // public getImageUrlFromOss(absPath:string, callback:(result:boolean,url:string)=>void){
    //     if(!this.allowUpload){
    //         callback(false,null);
    //         return;
    //     }
    //     this.func = callback;
    //     const absPaths = absPath;
    //     const gateway = UE.MWHttpForTs.Instance().GetPlayerGateway();
    //     console.warn(`网关`,UE.MWHttpForTs.Instance().GetPlayerGateway());
    //     console.warn(`截图数据`,absPaths);
    //     const url = gateway + "/object/data/save/persist"
    //     console.warn(`URL地址`,url);
    //     this.allowUpload = false;
    //     UE.MWHttpForTs.Instance().HttpUploadFiles(url, absPaths); 
    // }

    // public static  streamFetch(url:string, init:RequestInit) {
    //     return new Promise((resolve, reject) => {
    //         const req = UE.MWHttpRequest.Create();
    //         req.SetURL(url);
    //         req.SetVerb(init && init.method || "GET");
    //         req.SetHeader("Accept", "text/event-stream");
    //         req.SetHeader("Cache-Control", "no-cache");
    //         req.SetHeader("Connection", "keep-alive");
    //         if (init && init.headers) {
    //             for (const key in init.headers) {
    //                 req.SetHeader(key, init.headers[key]);
    //             }
    //         }
    //         // req.SetContent(init && init.body || "");
    //         req.OnRequestProgress.Add((request, bytesSent, byteReceived) => {
    //             let res = req.GetResponse().GetContentAsString();
    //             // res.GetContentAsString(),
    //             console.warn(res,bytesSent,byteReceived);
    //         });
            
    //         req.ProcessRequest();
    //     });
    // }


    public static async fetchChatGPT(msg:string, model:string){
        
        const url = 'https://api.openai.com/v1/chat/completions';

        const data = {
            "model": "gpt-3.5-turbo",
            "max_tokens": 50,
            "messages": [
                {
                    "role": "system",
                    "content": "你好我是帮助机器人"
                },
                {
                    "role": "user",
                    "content": "你好！"
                }
            ]
        };

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer sk-proj-Z0ZsyRRogoDDIKw3bWjoT3BlbkFJRZ2OyjTxfehfeMTiK90t"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.text();
        }
    }
}