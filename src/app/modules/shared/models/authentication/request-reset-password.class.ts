export class RequestResetPassword {
    constructor(id: string, token: string) {
        this.Id = id;
        this.token = token;
    }
    public Id: string;
    public password: string;
    public confirmPassword: string;
    public token: string;
}
