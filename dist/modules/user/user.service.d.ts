import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(username: string, email: string, password: string, fullName: string, avatarUrl?: string): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
}
