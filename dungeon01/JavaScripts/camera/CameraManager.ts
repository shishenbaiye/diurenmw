/*
 * @Author: guohua.zhang guohua.zhang@appshahe.com
 * @Date: 2024-01-21 17:01:27
 * @LastEditors: guohua.zhang guohua.zhang@appshahe.com
 * @LastEditTime: 2024-02-01 15:16:18
 * @FilePath: \musicgame\JavaScripts\camera\CameraManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { MSingletonPlugin, MConstructorInject } from "../framework/DI/MContainer";
import { MObject } from "../framework/Object/MObject";
import { Logger, LoggerManager } from "../tools/LoggerTool";
import { MathTool } from "../tools/MathTool";


@MSingletonPlugin()
export class CameraManager extends MObject {

    private curCameta: Camera;
    private playerCameta: Camera;
    private cacheCameta: Camera;
    private logger:Logger;
    private cameraMap: Map<string, Camera> = new Map<string, Camera>();
    private baseCameraArmLength:number;
    constructor(@MConstructorInject(LoggerManager) private log: LoggerManager){
        super();
        this.logger = this.log.getLogger(CameraManager);
    }

    init() {
        if (SystemUtil.isClient()) {
            this.logger.warn(`初始化相机`);
            this.curCameta = Camera.currentCamera;
            this.baseCameraArmLength = this.curCameta.springArm.length;
        }
    }

    /**获取当前相机 */
    getCurCamera(): Camera {
        return this.curCameta;
    }

    /**获取基础弹簧臂长度 */
    getBaseCameraArmLength():number{
        return this.baseCameraArmLength;
    }

    /**添加相机配置 */
    public addCamera(name: string, guid:string) {
        if(this.cameraMap.has(name)){
            this.logger.error(`相机已存在`,name);
            return;
        }
        let obj = GameObject.findGameObjectById(guid) as Camera;
        if(!obj){
            this.logger.error(`相机创建失败`,name);
            return;
        }
        this.cameraMap.set(name, obj);
    }

    public async setObject(obj: mw.GameObject, curPos: Vector, curRotation: Rotation, armLength: number = 3, fov: number = 40, armlocalPos: Vector = new Vector(0, 0, 0), armloaclRotation: Rotation = new Rotation(0, 0, 0)) {
        this.curCameta.parent = obj;
        this.curCameta.fov = fov;
        this.curCameta.springArm.length = armLength;
        this.curCameta.springArm.localTransform.position = armlocalPos;
        this.curCameta.springArm.localTransform.rotation = armloaclRotation;
        this.curCameta.worldTransform.position = obj.worldTransform.position.clone().add(curPos);
        this.curCameta.worldTransform.rotation = curRotation;
    }

    public async setCameraPosandRotation(curPos: Vector, curRotation: Rotation) {
        this.curCameta.worldTransform.position = this.curCameta.parent.worldTransform.position.clone().add(curPos);
        this.curCameta.worldTransform.rotation = curRotation;
    }

    /**切换相机 */
    public switchCamera(name:string, blendTime: number = 0, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number) {
        if(!this.cameraMap.has(name)){
            this.logger.error(`相机不存在`,name);
            return;
        }
        this.cacheCameta = Camera.currentCamera;
        let newCamera = this.cameraMap.get(name);
        Camera.switch(newCamera, blendTime, blendFunc, blendExp);
    }

    /**回到上个缓存的相机 */
    public backToCacheCamera(blendTime: number = 0, blendFunc?: mw.CameraSwitchBlendFunction, blendExp?: number) {
        Camera.switch(this.cacheCameta, blendTime, blendFunc, blendExp);
        this.cacheCameta = null;
    }

    /**视角转向指定的location*/
    public static lookAtLocation(_location: mw.Vector, _duration: number = 500) {
        // let camera = Camera.currentCamera;;
        // let goalVector = _location.clone().subtract(Player.localPlayer.character.worldTransform.position.clone());
        // let cameraVector = camera.worldTransform.getForwardVector();
        // let angle = MathTool.calculateEulerAngles(cameraVector, goalVector);
        // let cameraRotation = camera.worldTransform.rotation.clone();
        // let tw = new mw.Tween({ ro: 0 })
        //     .to({ ro: angle }, _duration)
        //     .easing(TweenUtil.Easing.Exponential.InOut)
        //     .onUpdate((obj) => {
        //         try {
        //             ModifiedCameraSystem.setOverrideCameraRotation(new Rotation(new Vector(cameraRotation.x, cameraRotation.y, cameraRotation.z + obj.ro)));
        //         } catch (e) {
        //             tw.stop();
        //         }
        //     })
        //     .onComplete(() => {
        //         setTimeout(() => {
        //             ModifiedCameraSystem.resetOverrideCameraRotation();
        //         }, 50);
        //     })
        //     .start();
    }

}
