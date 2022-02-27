module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //Display all regions in our database
    function getRegion(res, mysql, context, complete){
        mysql.pool.query("SELECT Region_ID AS id, Name as name FROM Region", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.region = results;
            complete();
        });
    }

    // Post method for inserting new regions
    router.post('/', function(req, res){
        console.log(req.body.name)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Region (Name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.render('region',results);
            }
        });
    });

    //Updates a region
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Region SET Region_ID = :region_idInput, Name = :name_idInput WHERE Region_ID= :region_ID_from_the_update_form";
        var inserts = [req.body.Region_ID, req.body.Name];
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
        var callBackCount = 0;
        var context = {};
        // context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getRegion(res, mysql, context, complete);
        function complete(){
            callBackCount++;
            if(callBackCount >= 1){
                res.render('region', context);
            }
        }
    });

    //Deleting Data from region
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Region WHERE Region_ID = ?";
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
    })

    return router;
}