export class Gameplay {
    public _id          :string;
    public name         :string;
    public duree        :any;
    public startTime    :any;
    public level        :number;
    public nbJoueur     :any;
    public gamers       :any;

    constructor(name: string, level: number, nbJoueur: any= null, _id: string = null,  duree: any = null, startTime: any = null, gamers: any = null) {
        this._id        = _id;
        this.name       = name;
        this.duree      = duree;
        this.startTime  = startTime;
        this.level      = level;
        this.nbJoueur   = nbJoueur;
        this.gamers     = gamers;
    }
}
