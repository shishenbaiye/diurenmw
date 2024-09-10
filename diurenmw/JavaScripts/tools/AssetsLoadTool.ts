/*
 * @Author: quanyi.huang quanyi.huang@appshahe.com
 * @Date: 2022-08-10 17:56:20
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-04 17:13:20
 * @FilePath: \JavaScripts\Common\Utils\AssetsLoad.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { oTraceError, oTraceWarning } from "odin";

export namespace AssetsLoadTool
{
    class Asset
    {
        isLoad = false;
        guid: string = null;
        constructor(isLoad: boolean, guid: string)
        {
            this.isLoad = isLoad;
            this.guid = guid;
        }
    }

    class Queue<T>
    {
        elemrnts;
        constructor()
        {
            this.elemrnts = new Array();
        }
        push(o)
        {
            if (o == null)
            {
                return false;
            }
            this.elemrnts.unshift(o);
            return true;
        }
        pop()
        {
            return this.elemrnts.pop();
        }
        size()
        {
            return this.elemrnts.length;
        }
        isempty()
        {
            return this.size() == 0;
        }
        clear()
        {
            delete this.elemrnts;
            this.elemrnts = new Array();
        }
        show(num)
        {
            if (num >= 0 && num < this.size())
            {
                return this.elemrnts[this.size() - 1 - num];
            }
            else
            {
                return;
            }
        }
        getAll()
        {
            return this.elemrnts;
        }
    }
    /**在加载中 */
    var inLoading = false;
    var asyncQueue = new Queue<Asset>();
    var queue = new Queue<Asset>();


    /**异步加载资源
     * @param guids 资源库guid
     * @returns 全部加载结束（不一定加载成功）
     */
    export async function asyncLoad(guids: string | string[]): Promise<boolean>
    {
        try
        {
            if (guids instanceof Array)
            {
                for (let i = 0; i < guids.length; i++)
                {
                    if (!StringUtil.isEmpty(guids[i]) && !mw.AssetUtil.assetLoaded(guids[i]))
                        asyncQueue.push(new Asset(mw.AssetUtil.assetLoaded(guids[i]), guids[i]))
                }
            }
            else
            {
                if (!StringUtil.isEmpty(guids) && !mw.AssetUtil.assetLoaded(guids))
                    asyncQueue.push(new Asset(mw.AssetUtil.assetLoaded(guids), guids))
            }
            return await asyncLoading();
        } catch (error)
        {
            oTraceError(`主动加载资源异常，可能是Util.AssetUtil.asyncDownloadAsset不好使，需要寻找代替方法:${error}`)
        }
    }
    /**异步加载资源
     * @param guids 资源库guid
     * @returns 全部加载结束（不一定加载成功）
     */
    export function Load(guids: string | string[])
    {
        try
        {
            if (guids instanceof Array)
            {
                for (let i = 0; i < guids.length; i++)
                {
                    if (!StringUtil.isEmpty(guids[i]) && !mw.AssetUtil.assetLoaded(guids[i]))
                        queue.push(new Asset(mw.AssetUtil.assetLoaded(guids[i]), guids[i]))
                }
            }
            else
            {
                if (!StringUtil.isEmpty(guids) && !mw.AssetUtil.assetLoaded(guids))
                    queue.push(new Asset(mw.AssetUtil.assetLoaded(guids), guids))
            }
            preLoad();
        } catch (error)
        {
            oTraceError(`主动加载资源异常，可能是Util.AssetUtil.asyncDownloadAsset不好使，需要寻找代替方法:${error}`)
        }
    }


    /**同时加载,异步等待 */
    export async function syncLoad(guids: string[])
    {
        return new Promise<{ "success": number, "fail": number }>((resolve: (value: { "success": number, "fail": number }) => void) =>
        {
            
            let a: { "success": number, "fail": number } = { "success": 0, "fail": 0 } 
            for (let i = 0; i < guids.length; i++)
            {
                if (mw.AssetUtil.assetLoaded(guids[i]))
                {
                    a.success++
                    if (a.success + a.fail >= guids.length)
                        return resolve(a)
                }
                else
                {
                    mw.AssetUtil.asyncDownloadAsset(guids[i]).then(b =>
                    {
                        if(b) 
                            a.success++; 
                        else
                            a.fail++ 
                        if (a.success + a.fail >= guids.length)
                            return  resolve(a)
                    })
                }
            }
            if (a.success + a.fail == guids.length)
                return resolve(a)
        })
    }


    function preLoad()
    {
        let ass = queue.pop();
        while (ass)
        {
            if (!ass.isLoad)
            {
                ass.isLoad = true;
                let b = mw.AssetUtil.asyncDownloadAsset(ass.guid)
                if (!b)
                    oTraceWarning(`加载资源不成功：guid:${ass.guid}`)
            }
            ass = queue.pop();
        }
    }

    async function asyncLoading(): Promise<boolean>
    {
        if (inLoading)
            return;
        try
        {
            inLoading = true;
            let ass = asyncQueue.pop();
            while (ass)
            {
                if (!ass.isLoad)
                {
                    ass.isLoad = true;
                    let b = await mw.AssetUtil.asyncDownloadAsset(ass.guid)
                    if (!b)
                        oTraceWarning(`加载资源不成功：guid:${ass.guid}`)
                }
                ass = asyncQueue.pop();
            }
        } catch (error)
        {
            oTraceError(`不知道什么原因中断加载:${error}`)
        }
        inLoading = false;
        return true;
    }
}

