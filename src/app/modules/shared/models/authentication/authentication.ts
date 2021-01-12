export class Authentication {
    public email: string;
    public password: string;
}

export class UserAuthenticated {
    public id: string;
    public authenticated: boolean;
    public create: string;
    public expiration: string;
    public token: string;
    public userName: string;
    public userEmail: string;
    public message: string;
}
