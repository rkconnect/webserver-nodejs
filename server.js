/**
 * Created by Rohit on 5/28/2016.
 */


//Modules
var http = require ('http');
var url = require('url');
var fs = require('fs');
var path = require('path');


//MIME TYPE
var mimeTypes = {
    'html'  :   'text/html',
    'jpeg'  :   'image/jpeg',
    'jpg'   :   'image/jpg',
    'png'   :   'image/png',
    'js'    :   'text/javascript',
    'css'   :   'text/css'
};

http.createServer(function (req, res) {
    //relative file path
    var uri = url.parse(req.url).pathname;
    //console.log(uri);

    // absolute file path
    var fileName = path.join(process.cwd(),uri);

    //console.log(fileName);

    //check if the file is available
    var stats;
    try{
        stats = fs.lstatSync(fileName);

        //Check if its a file or directory.
        //Redirect to Index.html if its a directory
        if(stats.isFile()){
            var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
            res.writeHead(200, {'Content-Type': mimeType});
            fs.createReadStream(fileName).pipe(res);
        }else if (stats.isDirectory()){
            res.writeHead(302, {'Location': '/html/index.html'});
            res.end();
        }else {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write('Error 500\n Something Went Wrong!!');
            res.end();
        }
    }catch (e){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Error 404\n Page Not Found!!');
        res.end();
    }

}).listen(8888);

console.log('Server is running on port 8888');