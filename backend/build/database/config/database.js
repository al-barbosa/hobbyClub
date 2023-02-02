"use strict";
require("dotenv/config");
const config = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || 'senha_mysql',
    database: process.env.MYSQL_DATABASE || 'hobby_club',
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
};
module.exports = config;