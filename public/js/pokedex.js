module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all Pokedexes in our database
    function getRegion(res, mysql, context, complete){
        mysql.pool.query("SELECT Pokedex_ID as pid, Trainer_ID as tid FROM Pokedex ORDER BY pid ASC", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pokedex = results;
            complete();
        });
    }

    function getTrainer(res, mysql, context, complete){
        mysql.pool.query("SELECT Trainer_ID as tid, Name as name, Region_ID as rid FROM Trainer ORDER BY tid ASC", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            //Change context.HERE to an object name of your choice
            context.trainer = results;
            complete();
        });
    }

    //Get a specific Pokedex
    function getSpecificPokedex(res, mysql, context, id, complete){
        var sql = "SELECT Pokedex_ID as pid, Trainer_ID as tid FROM Pokedex WHERE Pokedex_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pokedex = results[0];
            complete();
        });
    }
    
    // Post method for inserting new pokedex
    router.post('/', function(req, res){
        // console.log(req.body.name)
        // console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Pokedex (Trainer_ID) VALUES (?)";
        var inserts = req.body.trainer_id;
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('pokedex.handlebars');
            }
        });
    });

    //Used for loading our update form
    router.get('/:id', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        // console.log("Outputting update page ID")
        // console.log(req.params.id);
        getSpecificPokedex(res, mysql, context, req.params.id, complete);
        function complete(){
            res.render('updatePokedex.handlebars', context);
            

        }
    });

    //Updates a Pokedex
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Pokedex SET Trainer_ID = ? WHERE Pokedex_ID = ?";
        console.log("Pokedex Trainer ID");
        console.log(req.body.tid);
        var inserts = [req.body.tid, req.body.pid];
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
        let count = 0
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getRegion(res, mysql, context, complete);
        getTrainer(res, mysql, context, complete);
        function complete(){
            count++
            if (count >= 2){
                res.render('pokedex.handlebars', context);
            }
        }
    });

    //Deleting Data from pokedex
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Pokedex WHERE Pokedex_ID = ?";
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