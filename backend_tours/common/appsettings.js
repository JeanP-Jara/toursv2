var mysql = require("mysql2");

let local = {
    host: 'localhost',
    user: 'root',    
    password: 'root',
    database: 'tours',    
    port: 3306
}

let prod = {
  user: 'xxxxxx',
  host: 'xxxxxxxxxx.compute.amazonaws.com',
  database: 'xxxxx',
  password: 'xxxx',
}

var connection = mysql.createConnection(local);
connection.connect();
 
/* connection.query('Select * from usuario', function (error, results, fields) {
  if (error) throw error;
  console.log('The usuario is: ', results);
  console.log('The fields is: ', fields);
}); */

module.exports={
    connection
}
