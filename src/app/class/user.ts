export class User {
    public username    : string;
    public alive       : boolean;
    public password    : string;
    public tags        : [String]

    constructor (_id: string = null, username: string = null, alive: boolean = true, password: string = null, tags: [string] = null) {
        this.username = username;
        this.alive = alive;
        this.password = password;
        this.tags = tags
    }
}
