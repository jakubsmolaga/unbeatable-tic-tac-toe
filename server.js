const express = require('express');
let app = express();

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/files/index.html');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
