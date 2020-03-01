var app = require('../app');
var http = require('http');


// var port = normalizePort(process.env.PORT||'3000');
var port = '3000';
app.set('port',port);




var server = http.createServer(app);


server.listen(port, () => {console.log('Server up and running on port 3000')});
