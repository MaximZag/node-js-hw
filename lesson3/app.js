
const path = require('path');
const express = require('express');
const {engine} = require('express-handlebars');
const apiRoutes = require("./routes/apiRoutes");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRoutes);

app.use((req, res) => {
    res.render('notFound');
})

app.listen(8000, () => {
    console.log('Server listening on port 8000!');
})
