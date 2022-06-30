"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routerApi = (0, express_1.Router)();
routerApi.get('/', (req, res) => {
    res.send('ok');
});
// * USER ROUTES
routerApi.post('/sign-in', (req, res) => {
    res.send('ok');
});
routerApi.post('/sign-up', (req, res) => {
    res.send('ok');
});
routerApi.post('/logout', (req, res) => {
    res.send('ok');
});
exports.default = routerApi;
