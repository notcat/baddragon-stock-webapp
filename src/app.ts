import express from "express";
import exphbs from "express-handlebars";
import path from 'path';
import { Client } from "pg";

import webpush from 'web-push';

const app = express();

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'baddragonsubscriptions',
    password: 'Debit_12',
    port: 5432,
  })
client.connect()


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

app.post('/getsub', async (req, res) => {
    let query = await client.query('SELECT * FROM subscriptions');

    console.log(query.rows[0].subscription);

    res.send(query.rows[0]);
});

//subscribe route
app.post('/subscribe', async (req, res)=>{
    //get push subscription object from the request
    const subscription: string = JSON.stringify(req.body.subscription);
    const trackedItems = req.body.trackedItems;

    console.log(subscription);

    // TODO: sanitization and making sure it is correct format and shit lol

    // Push subscription into the subscriptions table if not exists
    let query1 = await client.query(`INSERT INTO subscriptions (subscription) ` +
                                    `VALUES ('${subscription}') ON CONFLICT DO NOTHING`);

    trackedItems.toys.forEach((item: string) => {
        console.log(item);
    });

    let queryInput = ``;

    // let query2 = await client.query(`INSERT INTO trackedToys (subscription) ` +
    //                                 `VALUES ('${subscription}') ON CONFLICT subscription DO NOTHING`);

    //res.send(query.rows[0]);

    //send status 201 for the request
    res.status(201).json({});

    //create paylod: specified the detals of the push notification
    const payload: string = JSON.stringify({title: 'Section.io Push Notification' });


    //pass the object into sendNotification fucntion and catch any error
    //webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

console.log("Running on port 3000.")
app.listen(8080);

export default app;