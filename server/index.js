const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'index.html'); 

// La route '/' pointe sur HTML_FILE



const express = require('express');
const app = express();

app.use(express.static(DIST_DIR));

const port = process.env.PORT || 3000;
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.listen(port, function () {
 console.log('App listening on port: ' + port);
});