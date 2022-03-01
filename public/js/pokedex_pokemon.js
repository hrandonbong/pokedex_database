module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all Pokedexes in our database
    function getRegion(res, mysql, context, complete){
        mysql.pool.query("SELECT Pokedex_ID as did, Pokemon_ID as pid FROM Pokedex_Pokemon ORDER BY did ASC", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.row = results;
            complete();
        });
    }

    //Get a specific Pokedex
    function getSpecificPokedexPokemon(res, mysql, context, id, complete){
        var sql = "SELECT Pokedex_ID as did, Pokemon_ID as pid FROM Pokedex_Pokemon WHERE Pokemon_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.row = results[0];
            complete();
        });
    }
    
    // Post method for inserting new pokemon
    router.post('/', function(req, res){
        // console.log(req.body.name)
        // console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Pokedex_Pokemon (Pokedex_ID, Pokemon_ID) VALUES (?, ?)";
        var inserts = [req.body.did, req.body.pid];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('pokedex_pokemon.handlebars');
            }
        });
    });

    //Used for loading our update form
    router.get('/:id', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        // console.log("Outputting update page ID")
        // console.log(req.params.id);
        getSpecificPokedexPokemon(res, mysql, context, req.params.id, complete);
        function complete(){
            res.render('updatePokedexPokemon.handlebars', context);
        }
    });

    //Updates a Pokedex
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log("Update Pokedex Pokemon");
        console.log([req.body.did, req.body.pid, req.params.id]);
        var sql = "UPDATE Pokedex_Pokemon SET Pokedex_ID = ?, Pokemon_ID = ? WHERE Pokemon_ID = ?";
        // console.log("Pokemon ID");
        // console.log(req.body.pid);
        var inserts = [req.body.did, req.body.pid, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else{
                res.status(200);
                res.end();
            }
        });
    });

    /*Display all Pokedex. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getRegion(res, mysql, context, complete);
        function complete(){
            res.render('pokedex_pokemon.handlebars', context);
        }
    });

    //Deleting Data from pokedex
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Pokedex_Pokemon WHERE Pokemon_ID = ?";
        console.log(req.params.id);
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });

    return router;
}();