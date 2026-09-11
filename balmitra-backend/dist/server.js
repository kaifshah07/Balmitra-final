"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const admin_bootstrap_1 = require("./modules/admin/admin.bootstrap");
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    await (0, admin_bootstrap_1.ensureInitialAdmin)();
    app_1.default.listen(env_1.env.PORT, () => {
        console.log(`
====================================
🚀 Balmitra Backend Started
🌐 Port : ${env_1.env.PORT}
🌍 Mode : ${env_1.env.NODE_ENV}
====================================
`);
    });
};
startServer();
