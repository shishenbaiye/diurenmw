import { TagBase } from "./TagBase";

export class GE extends TagBase{
    CoolDown = new CoolDown(this.owner);
}

class CoolDown extends TagBase{
    Mage = new Mage(this.owner);
}

class Mage extends TagBase{
  
}
