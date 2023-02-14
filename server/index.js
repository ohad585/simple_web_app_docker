const express = require('express');
const keys = require('./keys')
const {Pool} = require('pg');
const { pgPassword } = require('./keys');
const bodyParser = require('body-parser');
const cors = require('cors');

// Postgres Client Setup
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: pgPassword,
    port: keys.pgPort
});
pgClient.on('error',()=>console.log('Lost PG Connection'))

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (ip varchar(255),count INT)')
    .catch(err=>console.log(err))

// Express Client Setup
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/api/values",async (req,res)=>{
    console.log("returning all")
    const values = await pgClient.query('SELECT * from values');
    console.log('====================================');
    console.log(values.rows);
    console.log('====================================');
    res.send(values.rows);
})

app.post("/api/updatevalue",async (req,res)=>{
    const ip = req.body.ip;
    const count = req.body.count;
    console.log("update value Ip: "+ip+" count: "+count)
    pgClient.query('UPDATE values SET count=$2 WHERE ip=$1',[ip,count]);

    res.send({working: true});
})

app.post("/api/setvalue",async (req,res)=>{
    const ip = req.body.ip;
    const count = req.body.count;
    console.log("Set value Ip: "+ip+" count: "+count)
    pgClient.query('INSERT into values(ip,count) VALUES($1,$2)',[ip,count]);

    res.send({working: true});
})

const PORT = 8081
app.listen(PORT,()=>{
    console.log("listening on port "+ PORT)
})

exports = app 