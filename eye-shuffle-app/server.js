const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const face = require('./face');

app.use(bodyParser.json({limit: '50mb'}));

//const face = require('./face');
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.post("/emotion", (req, res) => {
  //console.log(req.body.image_data);
  image_data = req.body.image_data;
  image_data = image_data.replace("data:image/png;base64,", "");
  //console.log(image_data);
  const buf = Buffer.from(image_data, "base64");
  //console.log(buf);
  face(buf).then((res) => {
    //console.log(res);
    console.log(res);
  });
});

app.get("/asdf", (req, res) => {
  res.send("test");
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
