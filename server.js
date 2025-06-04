const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.post('/login', (req, res) =>{
    const {nombre, contrasena} = req.body;
    const sql = 'SELECT * FROM usuario WHERE nombre = ? AND contrasena = ?';
    db.query(sql, [nombre, contrasena], (err, resultados)=>{
        if(err) throw err;
        if(resultados.length > 0){
            res.send('Incio de sesion existoso');
        }else{
            res.send('Credenciales incorrectas');
        }
    });
});

app.post('/insertar', (req, res) =>{
    const {usuario, contrasena} = req.body;
    const Verificar = 'SELECT * FROM usuario WHERE nombre = ?';
    db.query(Verificar, [nombre], (err2, resultados)=>{
        if(err2) throw err2;

        if(resultados.length > 0){
            res.send('Usuario ya existente');
        }else{
            const insertar = 'INSERT INTO usuario (nombre, contrasena) VALUES (?, ?)';
            db.query(insertar, [nombre, contrasena], (err3, resultados)=>{
            if(err3) throw err3;
            res.send('Usuario registrado con éxito');
            });
        }
    });
});

app.listen(3000, ()=>{
    console.log('Servidor corriendo en http://localhost:3000');
});
