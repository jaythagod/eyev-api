const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{

    res.send('This is live');

});


app.listen(4000,()=>{
    console.log("Server up on port 4000!!!");
});