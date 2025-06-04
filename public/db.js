const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mapaweb'
});
db.connect((err) =>{
    if(err) throw err;
    console.log('Conectado a MySQL');
});
module.exports = db;