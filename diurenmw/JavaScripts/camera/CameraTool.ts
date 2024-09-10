/*
 * @Author: guohua.zhang guohua.zhang@appshahe.com
 * @Date: 2024-01-21 17:01:27
 * @LastEditors: guohua.zhang guohua.zhang@appshahe.com
 * @LastEditTime: 2024-01-21 18:46:24
 * @FilePath: \musicgame\JavaScripts\camera\CameraTool.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class CameraTool {
    /**
     * 相机聚焦自己或物体
     * @param isShow 是否聚焦
     * @param obj 聚焦的物体
     * @param offsetAngle 偏移角度
     * @param offsetZ   偏移Z
     * @param armLen 视长
     */
    public static async setObjCloseUp(isShow: boolean, obj: mw.GameObject, offsetAngle: number = 20, offsetZ: number = -10, armLen: number = 40) {
        let isOther = !!obj;
        let chara = Player.localPlayer.character;
        if (!obj) {
            obj = chara;
        }

        let cameraSystem = Camera.currentCamera;
        //摄像机位置延迟
        cameraSystem.positionLagEnabled = true;
        //摄像机旋转延迟
        cameraSystem.rotationLagEnabled = true;
        //聚焦状态
        if (isShow) {
            if (isOther) {
                cameraSystem.parent = obj;
            } else {
                cameraSystem.parent = Player.localPlayer.character;
            }

            // let ro = obj.worldTransform.clone().rotation;
            // let z = ro.z - 180;
            // let forward = obj.worldTransform.clone().getForwardVector();
            // let tarp = new mw.Vector(forward.x * 200, forward.y * 200, forward.z * 200);
            // let x = tarp.x * Math.cos(offsetAngle) + tarp.y * Math.sin(offsetAngle);
            // let y = -tarp.x * Math.sin(offsetAngle) + tarp.y * Math.cos(offsetAngle);
            cameraSystem.springArm.length;
        }
    }

    // public static async setObject(obj: mw.GameObject, armLength: number = 1, armlocalPos: Vector = new Vector(0, 0, 30), armloaclRotation: Rotation = new Rotation(0, 0, 0)) {
    //     let cameraSystem = Camera.currentCamera;
    //     cameraSystem.parent = obj;
    //     cameraSystem.springArm.length = armLength;
    //     cameraSystem.springArm.localTransform.position = armlocalPos;
    //     cameraSystem.springArm.localTransform.rotation = armloaclRotation;
    // }
}
