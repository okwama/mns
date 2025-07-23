"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const main_nest_1 = require("./main.nest");
let cachedServer;
async function handler(req, res) {
    if (!cachedServer) {
        cachedServer = await (0, main_nest_1.createNestServer)();
    }
    return cachedServer(req, res);
}
//# sourceMappingURL=main.vercel.js.map