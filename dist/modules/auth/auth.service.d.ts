import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(username: string, email: string, password: string, fullName: string, avatarUrl?: string): Promise<{
        id: number;
        username: string;
        email: string;
        fullName: string;
        avatarUrl: string;
    }>;
    login(identifier: string, password: string): Promise<{
        access_token: string;
        id: number;
        username: string;
        email: string;
        fullName: string;
        avatarUrl: string;
    }>;
}
