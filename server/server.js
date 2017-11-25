var express = require('express');
var multer  = require('multer')
var fs = require('fs');
var app = express();

//var storage = multer.diskStorage()
var upload = multer({ dest: 'uploads/' })

app.get('/', function(req, res){
    console.log('GET /')
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/', upload.single('file'), function (req, res, next) {
    console.log('POST /');
    console.log(req.file);
    if(req.file){
      res.end("Ok");

    } else {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error}));
    }


  });

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)
