const express = require('express');
const movedData = require('./movedData.json');
const app = express();
const port = 3000;

app.use('/', express.static('public'));



app.get('/hello', (req,res) => {
    res.send ('Hello World!');
});

app.get('/budget', (req,res) => {
    res.json(movedData)
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});