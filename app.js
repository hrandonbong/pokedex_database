// app.js
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

// Define Express App
var app = express();
var port = process.env.PORT || 6107;
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use('/region', require('./region.js'));
// app.use('/pokedex', require('./pokedex.js'));
// app.use('/planets', require('./planets.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, () => {
    console.log('Server connected at http://localhost:' + port);
});

















//Set up Routes
//app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname,'index.html'));
////});

//app.get('/favorite', function(req, res) {
   // res.sendFile(path.join(__dirname, 'favorite.html'));
//});









