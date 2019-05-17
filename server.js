const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'landing.html')));
//app.use(express.static(__dirname + '/landing'));
app.use(express.static(__dirname));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));