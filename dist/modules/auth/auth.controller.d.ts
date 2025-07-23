import { AuthService } from './auth.service';
declare class RegisterDto {
    username: string;
    email: string;
    password: string;
    fullName: string;
    avatarUrl?: string;
}
declare class LoginDto {
    identifier: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        fullName: string;
        avatarUrl: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        id: number;
        username: string;
        email: string;
        fullName: string;
        avatarUrl: string;
    }>;
}
export {};
