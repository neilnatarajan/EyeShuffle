const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));