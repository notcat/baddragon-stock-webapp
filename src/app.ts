import express from "express";
import exphbs from "express-handlebars";
import path from 'path';

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../src/views/layouts'),
    partialsDir: path.join(__dirname, '../src/views'),
}))
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

console.log("Running on port 3000.")
app.listen(3000);

export default app;