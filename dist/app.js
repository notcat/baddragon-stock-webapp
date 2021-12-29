"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var pg_1 = require("pg");
var web_push_1 = __importDefault(require("web-push"));
var app = (0, express_1.default)();
var client = new pg_1.Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'baddragonsubscriptions',
    password: 'Debit_12',
    port: 5432,
});
client.connect();
// TODO: Should use environment variables
var publicVapidKey = 'BGp8cIoDXAnmKwOExLVUDg0B9fxiiMmWTXfbqbXKDvR-eK0zwqa-kti9lqYDbFUPOqGOUS8tIzbY_6SrY2BaMLU';
var privateVapidKey = '-s7AymwvQ7q36mUnR7nGNikAXN8SWdXslvtD9NAXAU8';
//setting vapid keys details
web_push_1.default.setVapidDetails('mailto:cum@cumdumpin.com', publicVapidKey, privateVapidKey);
// View Engine
app.engine('handlebars', (0, express_handlebars_1.default)({
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, '../src/views/layouts'),
    partialsDir: path_1.default.join(__dirname, '../src/views'),
}));
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.set('view engine', 'handlebars');
// Middleware
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
app.use(express_1.default.json());
// Routes
// TODO: Move to different files.
app.get('/', function (req, res) {
    res.render('home');
});
app.post('/getsub', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.query('SELECT * FROM subscriptions')];
            case 1:
                query = _a.sent();
                console.log(query.rows[0].subscription);
                res.send(query.rows[0]);
                return [2 /*return*/];
        }
    });
}); });
//subscribe route
app.post('/subscribe', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subscription, trackedItems, query1, queryInput, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subscription = JSON.stringify(req.body.subscription);
                trackedItems = req.body.trackedItems;
                console.log(subscription);
                return [4 /*yield*/, client.query("INSERT INTO subscriptions (subscription) " +
                        ("VALUES ('" + subscription + "') ON CONFLICT DO NOTHING"))];
            case 1:
                query1 = _a.sent();
                trackedItems.toys.forEach(function (item) {
                    console.log(item);
                });
                queryInput = "";
                // let query2 = await client.query(`INSERT INTO trackedToys (subscription) ` +
                //                                 `VALUES ('${subscription}') ON CONFLICT subscription DO NOTHING`);
                //res.send(query.rows[0]);
                //send status 201 for the request
                res.status(201).json({});
                payload = JSON.stringify({ title: 'Section.io Push Notification' });
                return [2 /*return*/];
        }
    });
}); });
console.log("Running on port 3000.");
app.listen(8080);
exports.default = app;
