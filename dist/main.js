"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_nest_1 = require("./main.nest");
async function bootstrap() {
    const app = await (0, main_nest_1.createNestServer)();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`.Server running on port ${port}...`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map