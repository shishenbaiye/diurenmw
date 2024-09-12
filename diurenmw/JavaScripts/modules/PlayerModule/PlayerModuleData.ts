export class PlayerModuleData extends Subdata{
    @Decorator.persistence()
    playerName: string;

    @Decorator.persistence()
    playerRole: string;
}