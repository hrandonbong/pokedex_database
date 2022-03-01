module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all Pokedexes in our database
    function getIndex(res, mysql, name, context, complete){
        var sql = "SELECT Pokemon.ID_Tag as pid, Pokemon.Name as name, Pokemon.Type as type,\
        Pokemon.Region_ID as rid, Pokemon.Pre_Evolution as preevo, Pokedex.Pokedex_ID as did,\
        Trainer.Name as Trainer FROM Pokemon\
        INNER JOIN Pokedex_Pokemon ON Pokemon.ID_Tag = Pokedex_Pokemon.Pokemon_ID\
        INNER JOIN Pokedex ON Pokedex_Pokemon.Pokedex_ID = Pokedex.Pokedex_ID\
        INNER JOIN Trainer ON Pokedex.Trainer_ID = Trainer.Trainer_ID\
        WHERE Pokemon.Name = ?";
        var inserts = [name];
        console.log('Inputted Name')
        console.log(inserts);
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pokemon = results[0];
            complete();
        });
    }

    /*Display all Pokedex. Requires web based javascript to delete users with AJAX*/
    router.post('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        console.log(req.body.name);
        getIndex(res, mysql, req.body.name, context, complete);
        function complete(){
            res.render('index.handlebars', context);
        }
    });

    router.get('/', function(req, res){
        res.render('index.handlebars');
    });

    return router;
}();