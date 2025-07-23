import { Request } from 'express';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: Request): Promise<{
        id: number;
        username: string;
        email: string;
        fullName: string;
        avatarUrl: string;
        role: string;
        isActive: boolean;
    }>;
    ping(): {
        message: string;
    };
}
