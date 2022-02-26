var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_hongbra',
  password        : '6107',
  database        : 'cs340_hongbra'
});
module.exports.pool = pool;