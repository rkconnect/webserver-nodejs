/**
 * Created by Rohit on 5/28/2016.
 */

var http = require ('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Context-Type': 'text/plain'});
    res.end('Hello World!!\n');
}).listen(8888);

console.log('Server is running on port 8888');