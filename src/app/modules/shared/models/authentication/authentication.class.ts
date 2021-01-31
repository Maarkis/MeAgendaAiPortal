export class Authentication {
    public email: string;
    public password: string;
}

export class UserAuthenticated {
    public id: string;
    public secondaryId: string;
    public authenticated: boolean;
    public create: string;
    public expiration: string;
    public token: string;
    public refreshToken: string;
    public userName: string;
    public userEmail: string;
    public message: string;
    public userImage: string;
    public verified: boolean;
    public role: number;
}
