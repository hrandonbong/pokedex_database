// app.js
var express = require('express');

// Define Express App
var app = express();
var port = process.env.PORT || 8080;

// Server Static Assets
app.use(express.static('public'));

//Virtual Path Prefix '/static'
app.use('/static', express.static('public'))

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









