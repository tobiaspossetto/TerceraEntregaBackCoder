"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.args = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const minimist_1 = __importDefault(require("minimist"));
const ViewsRoute_1 = __importDefault(require("./routes/ViewsRoute"));
const passport_1 = __importDefault(require("passport"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const mongoConnection_1 = require("./db/mongoConnection");
require("./middlewares/passportMiddleware");
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.args = (0, minimist_1.default)(process.argv.slice(2));
exports.PORT = exports.args._[0] || process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
(0, mongoConnection_1.getConnectionMongo)();
app.set('views', './src/public/views');
app.set('view engine', 'pug');
app.use('/', ViewsRoute_1.default);
app.use('/api/user', UserRouter_1.default);
exports.default = app;
