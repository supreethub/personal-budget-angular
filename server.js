const express = require('express');
const movedData = require('./movedData.json');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());


app.get('/budget', (req,res) => {
    res.json(movedData)
});

app.listen(port, () => {
    console.log('API listening at http://localhost:${port}');
});