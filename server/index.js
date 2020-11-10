const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;

const path = require('path');
const DIST_DIR = path.join(__dirname, '../dist');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

// Static files
app.use(express.static(DIST_DIR));

app.get('/api', (res) => {
  res.send(mockResponse);
});

app.get('/', (res) => {
 res.status(200).send('Hello World!');
});

http.listen(port, function () {
 console.log('App listening on port: ' + port);
});


const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('action', (params) => {
    socket.broadcast.emit('action', params);
  })
});
