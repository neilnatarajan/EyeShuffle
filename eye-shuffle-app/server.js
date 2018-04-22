const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const face = require('./face');

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'build')));

const PORT = 8080;

const EMOTIONS = ['happiness', 'anger', 'contempt', 'digust', 'fear', 'neutral', 'sadness', 'surprise'];

var frame = 0;
/* list of hashmaps where the keys are ['happiness', 'anger', 'contempt', 'digust', 'fear', 'neutral', 'sadness', 'surprise' and values are avg */
var arr = [];

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
      let averages = {};

      for (let emotion of EMOTIONS) {
        averages[emotion] = 0;

        for (let face of apiRes) {
          averages[emotion] += face.faceAttributes.emotion[emotion];
        }

        averages[emotion] /= apiRes.length;
      }

      arr.push(averages);
      frame += 1;

      res.send(averages);
    }
  });
});

app.get("/asdf", (req, res) => {
  res.send("test");
});

app.get("/trend_list", (req, res) => {
  res.send({trend_list: arr});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
