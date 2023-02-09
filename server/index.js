const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host: 'redis-server',//The name of the redis container specified in docker-compose file
    port: 6379
});
client.set('visits',0)

app.get("/",(req,res)=>{
    console.log("/ reached");
    client.get('visits',(err,visits)=>{
        console.log('====================================');
        console.log("visits is "+visits);
        console.log('====================================');
        res.send("Number of visits is "+visits)
        client.set('visits',parseInt(visits)+1)
    })
})

const PORT = 8081
app.listen(PORT,()=>{
    console.log("listening on port "+ PORT)
})