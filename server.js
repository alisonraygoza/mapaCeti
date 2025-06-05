const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.post('/login', (req, res) =>{
    const {usuario, contrasena} = req.body;
    const sql = 'SELECT * FROM usuario WHERE nombre = ? AND contrasena = ?';
    db.query(sql, [usuario, contrasena], (err, resultados)=>{
        if(err) throw err;
        if(resultados.length > 0){
            res.redirect('index.html');
            //alert('Inicio de sesión exitoso');
        }else{
            //alert('Credenciales incorrectas');
        }
    });
});

app.post('/insert', (req, res) =>{
    const {usuario, contrasena} = req.body;
    const Verificar = 'SELECT * FROM usuario WHERE nombre = ?';
    db.query(Verificar, [usuario], (err2, resultados)=>{
        if(err2) throw err2;

        if(resultados.length > 0){
            //alert('Usuario ya existente');
        }else{
            const insertar = 'INSERT INTO usuario (nombre, contrasena) VALUES (?, ?)';
            db.query(insertar, [usuario, contrasena], (err3, resultados)=>{
            if(err3) throw err3;
            res.send(`
                <script>
                    alert("Registro exitoso");
                    window.location.href = "/index.html";
                </script>
                `);
            });
        }
    });
});

app.listen(3000, ()=>{
    console.log('Servidor corriendo en http://localhost:3000');
});
