import express from "express";
import exphbs from "express-handlebars";
import path from 'path';

import webpush from 'web-push';

const app = express();

// TODO: Should use environment variables
const publicVapidKey = 'BGp8cIoDXAnmKwOExLVUDg0B9fxiiMmWTXfbqbXKDvR-eK0zwqa-kti9lqYDbFUPOqGOUS8tIzbY_6SrY2BaMLU';
const privateVapidKey = '-s7AymwvQ7q36mUnR7nGNikAXN8SWdXslvtD9NAXAU8';

//setting vapid keys details
webpush.setVapidDetails('mailto:cum@cumdumpin.com', publicVapidKey,privateVapidKey);

// View Engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../src/views/layouts'),
    partialsDir: path.join(__dirname, '../src/views'),
}))
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.static(path.join(__dirname, '../src/public')));
app.use(express.json());

// Routes
// TODO: Move to different files.
app.get('/', (req, res) => {
    res.render('home');
});

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const subscription = req.body;

    console.log(req.body)

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification' });


    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

console.log("Running on port 3000.")
app.listen(3000);

export default app;