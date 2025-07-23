"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(username, email, password, fullName, avatarUrl = '') {
        const existingEmail = await this.userService.findByEmail(email);
        if (existingEmail)
            throw new common_1.ConflictException('Email already in use');
        const existingUsername = await this.userService.findByUsername(username);
        if (existingUsername)
            throw new common_1.ConflictException('Username already in use');
        const user = await this.userService.create(username, email, password, fullName, avatarUrl);
        return { id: user.id, username: user.username, email: user.email, fullName: user.fullName, avatarUrl: user.avatarUrl };
    }
    async login(identifier, password) {
        let user = await this.userService.findByEmail(identifier);
        if (!user) {
            user = await this.userService.findByUsername(identifier);
        }
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: user.id, email: user.email, username: user.username, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            avatarUrl: user.avatarUrl,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map