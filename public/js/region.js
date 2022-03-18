module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all regions in our database
    function getRegion(res, mysql, context, complete){
        mysql.pool.query("SELECT Region_ID as id, Name as name FROM Region ORDER BY id ASC", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.region = results;
            complete();
        });
    }

    //Get a specific region
    function getSpecificRegion(res, mysql, context, id, complete){
        var sql = "SELECT Region_ID as id, Name as name FROM Region WHERE Region_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.region = results[0];
            complete();
        });
    }
    
    // Post method for inserting new regions
    router.post('/', function(req, res){
        // console.log(req.body.name)
        // console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Region (Name) VALUES (?)";
        var inserts = req.body.name;
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('regions.handlebars');
            }
        });
    });

    //Used for loading our update form
    router.get('/:id', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        console.log("Outputting update page ID")
        console.log(req.params.id);
        getSpecificRegion(res, mysql, context, req.params.id, complete);
        function complete(){
            res.render('updateRegions.handlebars', context);
            

        }
    });

    //Updates a region
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Region SET Name = ? WHERE Region_ID = ?";
        var inserts = [req.body.name, req.body.id];
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

    /*Display all Regions. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getRegion(res, mysql, context, complete);
        function complete(){
            res.render('regions.handlebars', context);
        }
    });

    function deleteRegion(res, mysql, context, id, complete){
        var sql = "DELETE FROM Region WHERE Region_ID = ?";
        var inserts = id;
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                complete();
            }
        });
    }

    //Deleting Data from region
    router.delete('/:id', function(req, res){
        var count = 0;
        var mysql = req.app.get('mysql');
        var id = req.params.id;
        deleteRegion(res, mysql, context, id, complete)
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(count >= 0){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }
        })
    });

    return router;
}();