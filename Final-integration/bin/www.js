var app = require('../app');
var http = require('http');


// var port = normalizePort(process.env.PORT||'3000');
var port = normalizePort(process.env.PORT || '5000');
app.set('port',port);




var server = http.createServer(app);


server.listen(port, console.log('Server running on port 5000'));

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }