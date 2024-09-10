@Serializable
export default class TagOperation{

    private currentFrame:number = 0;
    private operationFrame:number = 0;
    constructor(){
        TimeUtil.onEnterFrame.add(()=>{
            this.currentFrame++;
        });
    }

    @Property({replicated: true,})
    operationId:number = 0;

    @Property({replicated: true,})
    operationIdList:number[] = [];

    @Property({replicated: true,})
    currentOperationTypeList:number[] = [];   

    @Property({replicated: true})
    currentOperationTagList:string[] = [];

    addOperation(tag:string){
        if(this.currentFrame > this.operationFrame){
            this.operationFrame = this.currentFrame;
            this.operationIdList = [];
            this.currentOperationTypeList = [];
            this.currentOperationTagList = [];
        }
        this.operationId++;
        this.operationIdList.push(this.operationId);
        this.currentOperationTypeList.push(1);
        this.currentOperationTagList.push(tag);
    }

    removeOperation(tag:string){
        if(this.currentFrame > this.operationFrame){
            this.operationFrame = this.currentFrame;
            this.operationIdList = [];
            this.currentOperationTypeList = [];
            this.currentOperationTagList = [];
        }
        this.operationId++;
        this.operationIdList.push(this.operationId);
        this.currentOperationTypeList.push(2);
        this.currentOperationTagList.push(tag);
    }
}