module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all regions in our database
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

    //Get a specific region
    function getSpecificTrainer(res, mysql, context, id, complete){
        var sql = "SELECT Trainer_ID as tid, Name as name, Region_ID as rid FROM Trainer WHERE Trainer_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            //Change context.HERE to an object name of your choice
            context.trainer = results[0];
            complete();
        });
    }
    
    // Post method for inserting new regions
    router.post('/', function(req, res){
        // console.log(req.body.name)
        // console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Trainer (Name,Region_ID) VALUES (?,?)";
        var inserts = [req.body.name,req.body.region_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('trainer.handlebars');
            }
        });
    });

    //Used for loading our update form
    router.get('/:id', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        // console.log("Outputting update page ID")
        // console.log(req.params.id);
        getSpecificTrainer(res, mysql, context, req.params.id, complete);
        function complete(){
            res.render('updateTrainer.handlebars', context);
        }
    });

    //Updates a region
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Trainer SET Name = ?, Region_ID = ? WHERE Trainer_ID = ?";
        console.log(req.body.name, req.body.rid, req.body.tid);
        var inserts = [req.body.name, req.body.rid, req.body.tid];
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

    /*Display all Trainers. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getTrainer(res, mysql, context, complete);
        function complete(){
            res.render('trainer.handlebars', context);
        }
    });

    //Deleting Data from region
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Trainer WHERE Region_ID = ?";
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