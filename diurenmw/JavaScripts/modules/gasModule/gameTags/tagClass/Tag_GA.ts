import { TagBase } from "./TagBase";

export class GA extends TagBase{
    CoolDown = new CoolDown(this.owner);
}

class CoolDown extends TagBase{
    
}

