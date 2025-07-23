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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(req) {
        common_1.Logger.log('[Profile] getProfile endpoint called');
        const authHeader = req.headers['authorization'];
        common_1.Logger.log(`[Profile] Authorization header: ${authHeader}`);
        const user = req.user;
        common_1.Logger.log(`[Profile] Decoded JWT user: ${JSON.stringify(user)}`);
        if (!user) {
            common_1.Logger.error('[Profile] No user found in JWT payload');
            throw new Error('User not found');
        }
        const dbUser = await this.userService.findById(user.sub);
        if (!dbUser) {
            common_1.Logger.error(`[Profile] No user found in DB for sub: ${user.sub}`);
            throw new Error('User not found');
        }
        common_1.Logger.log(`[Profile] DB user: ${JSON.stringify(dbUser)}`);
        return {
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email,
            fullName: dbUser.fullName,
            avatarUrl: dbUser.avatarUrl,
            role: dbUser.role,
            isActive: dbUser.isActive,
        };
    }
    ping() {
        return { message: 'pong' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ping", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map