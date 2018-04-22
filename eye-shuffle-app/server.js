const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const face = require('./face');

app.use(bodyParser.json({limit: '50mb'}));

const PORT = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.post("/emotion", (req, res) => {
  //console.log(req.body.image_data);
  console.log(req.body);
  res.end();
});

app.get("/asdf", (req, res) => {
  res.send("test");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
