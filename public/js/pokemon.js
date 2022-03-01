module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all Pokedexes in our database
    function getPokemon(res, mysql, context, complete){
        mysql.pool.query("SELECT ID_Tag as pid, Name as name, Type as type, Region_ID as rid, Pre_Evolution as preevo FROM Pokemon ORDER BY pid ASC", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pokemon = results;
            complete();
        });
    }

    //Get a specific Pokedex
    function getSpecificPokemon(res, mysql, context, id, complete){
        var sql = "SELECT ID_Tag as pid, Name as name, Type as type, Region_ID as rid, Pre_Evolution as preevo FROM Pokemon WHERE ID_Tag = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pokemon = results[0];
            complete();
        });
    }
    
    // Post method for inserting new pokemon
    router.post('/', function(req, res){
        // console.log(req.body.name)
        // console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Pokemon (Name, Type, Region_ID, Pre_Evolution) VALUES (?, ?, ?, ?)";
        var inserts = [req.body.name, req.body.type, req.body.region_id, req.body.preevolution];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('pokemon.handlebars');
            }
        });
    });

    // Post method for inserting into Pokedex_Pokemon Table
    // router.post('/', function(req, res){
    //     // console.log(req.body.name)
    //     // console.log(req.body)
    //     var mysql = req.app.get('mysql');
    //     var sql = "INSERT INTO Pokedex_Pokemon (Pokedex_ID, Pokemon_ID) VALUES (?, ?)";
    //     var inserts = [req.body.did, req.body.pid];
    //     sql = mysql.pool.query(sql,inserts,function(error, results, fields){
    //         if(error){
    //             console.log(JSON.stringify(error))
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.redirect('pokemon.handlebars');
    //         }
    //     });
    // });

    //Used for loading our update form
    router.get('/:id', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        // console.log("Outputting update page ID")
        // console.log(req.params.id);
        getSpecificPokemon(res, mysql, context, req.params.id, complete);
        function complete(){
            res.render('updatePokemon.handlebars', context);
            

        }
    });

    //Updates a Pokedex
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Pokemon SET Name = ?, Type = ?, Region_ID = ?, Pre_Evolution = ? WHERE ID_Tag = ?";
        console.log("Pokemon ID");
        console.log(req.body.pid);
        var inserts = [req.body.name, req.body.type, req.body.rid, req.body.preevo, req.body.pid];
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
        getPokemon(res, mysql, context, complete);
        function complete(){
            res.render('pokemon.handlebars', context);
        }
    });

    //Deleting Data from pokedex
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Pokemon WHERE ID_Tag = ?";
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