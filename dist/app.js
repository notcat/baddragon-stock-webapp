"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var web_push_1 = __importDefault(require("web-push"));
var app = (0, express_1.default)();
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
//subscribe route
app.post('/subscribe', function (req, res) {
    //get push subscription object from the request
    var subscription = req.body;
    console.log(req.body);
    //send status 201 for the request
    res.status(201).json({});
    //create paylod: specified the detals of the push notification
    var payload = JSON.stringify({ title: 'Section.io Push Notification' });
    //pass the object into sendNotification fucntion and catch any error
    web_push_1.default.sendNotification(subscription, payload).catch(function (err) { return console.error(err); });
});
console.log("Running on port 3000.");
app.listen(3000);
exports.default = app;
