"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestServer = createNestServer;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
async function createNestServer() {
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    await app.init();
    return server;
}
//# sourceMappingURL=main.nest.js.map