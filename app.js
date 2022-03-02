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
app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use('/', express.static('public'));
app.use('/',require('./public/js/index.js'));
app.use('/index.handlebars',require('./public/js/index.js'));
app.use('/regions.handlebars', require('./public/js/region.js'));
app.use('/trainer.handlebars', require('./public/js/trainer.js'));
app.use('/pokedex.handlebars', require('./public/js/pokedex.js'));
app.use('/pokemon.handlebars',require('./public/js/pokemon.js'));
app.use('/pokedex_pokemon.handlebars',require('./public/js/pokedex_pokemon.js'));


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