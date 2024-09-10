export class ParabolaTool {

    /**当前辅助线物体 */
    static unitGuid: string = `390594`

    static parabola: Parabola = null;

    static init(num: number) {
        this.parabola = new Parabola(ParabolaTool.unitGuid, num);
        this.parabola.init();
    }

    static drow(dirction: Vector, offset: Vector, force: number) {
        this.parabola.drow(dirction, offset, force);
    }

    static getStartWorldLoction() {
        if (this.parabola.startBall) {
            return this.parabola.startBall.worldTransform.position.clone();
        }
    }

    static reset() {
        console.warn(`reset`)
        this.parabola.unitList.forEach((obj) => {
            obj.setVisibility(PropertyStatus.Off)
        });
        if(!this.parabola.endBall) return;
        this.parabola.endBall.setVisibility(PropertyStatus.Off);
    }
}


class Parabola {

    private guid: string;
    private num: number;

    constructor(guid: string, num: number) {
        this.guid = guid;
        this.num = num;
    }


    public onHit: Action

    public unitList: GameObject[] = [];
    private projectile: ProjectileMovement = null;
    public startBall: Model = null;
    public endBall: Model = null;
    init() {
        for (let i = 0; i < this.num * 2 + 5; i++) {
            GameObject.asyncSpawn(this.guid).then((obj) => {
                obj.setVisibility(PropertyStatus.Off)
                this.unitList.push(obj);
            })
        }

        GameObject.asyncSpawn(this.guid).then((obj) => {
            this.startBall = obj as Model;
            this.startBall.queryEnabled = false;
            this.startBall.collisionEnabled = false;
            this.startBall.worldTransform.scale = new Vector(0.5)
            // this.startBall.parent = Player.localPlayer.character;
            // this.startBall.localTransform.position = new Vector(0, 0, 0);
            this.startBall.setVisibility(PropertyStatus.Off);

            this.projectile = new ProjectileMovement(this.startBall, {})
            this.projectile.initialSpeed = 1000;
            this.projectile.owner = Player.localPlayer.character;
        })

        GameObject.asyncSpawn(`2F83DF674DA05C133C3AC591EA769BFA`).then((obj) => {
            this.endBall = obj as Model;
            this.endBall.queryEnabled = false;
            this.endBall.collisionEnabled = false;
            this.endBall.setVisibility(PropertyStatus.Off);
            this.endBall.opacity = 0.8;
        })
    }

    setOwner(obj: GameObject) {
        this.startBall.parent = obj;
    }

    drow(dirction: Vector, offset: Vector, force: number) {
        this.unitList.forEach((obj) => {
            obj.setVisibility(PropertyStatus.Off)
        });
        if(this.endBall){
            this.endBall.setVisibility(PropertyStatus.Off);
        }
        this.startBall.worldTransform.position = Player.localPlayer.character.worldTransform.position.clone().add(offset.clone());
        this.projectile.initialSpeed = force;
        let drowList = this.projectile.getTrajectory(dirction, this.num, 2);
        let lastPos = null;
        for (let i = 0; i < drowList.length; i++) {
            let obj = this.unitList[i] as Model;
            if (i == drowList.length - 1) {
                if(!this.endBall) continue;
                obj = this.endBall as Model;
                obj.worldTransform.position = drowList[i]
                obj.setVisibility(PropertyStatus.On);
            } else {
                if (i > 0) {
                    obj.worldTransform.position = drowList[i - 1]
                    obj.setVisibility(PropertyStatus.On);
                } else {
                    obj.worldTransform.position = drowList[i];
                }
                obj.worldTransform.scale = new Vector(0.1, 0.1, 0.1);
                if (lastPos) {
                    let nowPos = drowList[i];
                    let targetDirection = nowPos.clone().subtract(lastPos);
                    let length = targetDirection.length;
                    obj.worldTransform.scale = new Vector(0.1, 0.1, length / 100);
                    let quaternion = Quaternion.rotationTo(Vector.up, targetDirection.normalize());
                    obj.worldTransform.rotation = quaternion.toRotation();
                    lastPos = nowPos;
                } else {
                    lastPos = drowList[i];
                }
            }

        }
    }
}   