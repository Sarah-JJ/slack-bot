const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'service_monitor'
});

connection.connect(err => {
    if (err)
        throw err;
    else return ("MySQL connected...");
});


module.exports = connection;