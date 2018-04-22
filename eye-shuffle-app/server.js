const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const face = require('./face');

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'build')));

const PORT = 8080;

app.post('/emotion', (req, res) => {
  image_data = req.body.image_data;
  if (!image_data) {
    res.end(201);

    return;
  }

  image_data = image_data.replace('data:image/png;base64,', '');

  const buf = Buffer.from(image_data, "base64");

  face(buf).then((apiRes) => {
    if (apiRes.length === 0) {
      res.send({num_faces: 0})
    } else {
      let average = 0;

      for (let face of apiRes) {
        average += face.faceAttributes.emotion.happiness;
      }

      if (apiRes.length > 0) {
        average /= apiRes.length;
      }

      res.send({happiness: average, num_faces: apiRes.length});
    }
  });
});

app.get("/asdf", (req, res) => {
  res.send("test");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
