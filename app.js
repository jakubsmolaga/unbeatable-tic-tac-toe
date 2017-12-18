const express = require('express');

let app = express();

app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/files/index.html');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
