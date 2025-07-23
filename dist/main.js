"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT ?? 5000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    app.use((req, res, next) => {
        console.log('[Global] Incoming request:', req.method, req.url, req.headers['authorization']);
        next();
    });
}
bootstrap();
//# sourceMappingURL=main.js.map