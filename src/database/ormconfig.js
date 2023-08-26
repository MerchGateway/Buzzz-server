"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
var configuration_1 = require("../config/configuration");
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var config = (0, configuration_1["default"])();
exports.AppDataSource = new typeorm_1.DataSource({
    type: config.database.connection,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    synchronize: true,
    database: config.database.name,
    migrations: [config.database.migrations],
    entities: [config.database.entities]
});
