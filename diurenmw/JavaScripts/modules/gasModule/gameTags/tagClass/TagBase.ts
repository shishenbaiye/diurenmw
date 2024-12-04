export class TagBase{
    constructor(father?:string) {
        this.father = father;
        if(this.father){
            this.owner = `${father}.${this.constructor.name}`;
        }else{
            this.owner = this.constructor.name;
        }
    }
    private father:string; 
    owner: string; 
}