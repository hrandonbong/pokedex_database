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
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use('/', express.static('public'));
app.use('/regions.handlebars', require('./public/js/region.js'));
app.use('/trainer.handlebars', require('./public/js/trainer.js'));
app.use('/pokedex.handlebars', require('./public/js/pokedex.js'));
app.use('/pokemon.handlebars',require('./public/js/pokemon.js'));
app.use('/pokedex_pokemon.handlebars',require('./public/js/pokedex_pokemon.js'));
app.get('/',function(req,res){
    res.render('index') //We can omit the .handlebars extension as we do below
  });

app.get('/index.handlebars',function(req,res){
    res.render('index.handlebars') //We can omit the .handlebars extension as we do below
});

// app.get('/pokedex.handlebars',function(req,res){
//     res.render('pokedex.handlebars') //We can omit the .handlebars extension as we do below
// });

// app.get('/pokemon.handlebars',function(req,res){
//     res.render('pokemon.handlebars') //We can omit the .handlebars extension as we do below
// });

// app.get('/regions.handlebars',function(req,res){
//     res.render('regions.handlebars') //We can omit the .handlebars extension as we do below
// });

// app.get('/trainer.handlebars',function(req,res){
//     res.render('trainer.handlebars') //We can omit the .handlebars extension as we do below
// });

// app.use('/pokedex', require('./pokedex.js'));
// app.use('/planets', require('./planets.js'));

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