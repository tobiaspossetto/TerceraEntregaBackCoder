"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passportMiddleware_1 = require("../middlewares/passportMiddleware");
const routerViews = (0, express_1.Router)();
routerViews.get('/', passportMiddleware_1.isAuth, (req, res) => {
    res.render('index.pug');
});
routerViews.get('/sign-in', (req, res) => {
    res.render('signin.pug');
});
routerViews.get('/sign-up', (req, res) => {
    res.render('signup.pug');
});
exports.default = routerViews;
