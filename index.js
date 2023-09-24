const express = require('express');
const PORT = 5000;
const mongodb = require('./config/mongoose');
const ejsLayouts = require('express-ejs-layouts');


const app = express();

//middleware for passing data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('./assets'));

app.use(ejsLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));



mongodb.dbconnect.then(() => app.listen(PORT, () => {
    console.log("Server is running!")
}))


