const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'mysqldb',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

/*var sql = "DROP TABLE IF EXISTS people;";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
});*/

var sql = "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

var sql = "INSERT INTO people (name) VALUES ('Eduardo Souza')";
connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

app.get('/', (req, res) => {

    var orderinfo;   
    var i;
    var sql = "SELECT * FROM people;";
    
    connection.query(sql, (err, result) => {
        if(err) throw err;
        var htmlStr = `<h1>Full Cycle Rocks!</h1><ul>`;
        for(i = 0; i < result.length; i++){
            orderinfo = "Name: " + result[i].name + ".";
            htmlStr += `<li>${orderinfo}</li>`;
        }
        htmlStr += "</ul>";

        res.send(htmlStr);     
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
