const express = require('express');
const mysql = require('mysql');

const app = express();

const config = {
    host: 'mysqldb',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var sql = "DROP TABLE IF EXISTS people;";
connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
});
*/

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config);
    connection.query("CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    
    connection.query("INSERT INTO people (name) VALUES ('Eduardo Souza');", function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    let orderinfo;   
    let i;   
    connection.query("SELECT * FROM people;", (err, result) => {
        if(err) throw err;
        let htmlStr = `<h1>Full Cycle Rocks!</h1><ul>`;
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
