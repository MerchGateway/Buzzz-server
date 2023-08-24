"use strict";
exports.__esModule = true;
exports.getRedisConfiguration = void 0;
var getRedisConfiguration = function (config) {
    var redisUrl = config.redis.redis_url;
    console.log(redisUrl);
    if (redisUrl) {
        var parsedUrl = new URL(redisUrl);
        return {
            host: parsedUrl.hostname,
            password: parsedUrl.password,
            port: Number(parsedUrl.port)
        };
    }
    return {
        host: config.database.host,
        port: config.redis.port
    };
};
exports.getRedisConfiguration = getRedisConfiguration;
