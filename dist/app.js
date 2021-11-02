"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.engine('handlebars', (0, express_handlebars_1.default)({
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, '../src/views/layouts'),
    partialsDir: path_1.default.join(__dirname, '../src/views'),
}));
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    res.render('home');
});
console.log("Running on port 3000.");
app.listen(3000);
exports.default = app;
