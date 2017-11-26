var express = require('express');
var multer  = require('multer');
var Client = require('ssh2');
var PythonShell = require('python-shell');
var fs = require('fs');
var app = express();

var connSettings = {
     host: 'mlgpu1.bitville.com',
     port: 22, // Normal is 22 port
     username: 'team1',
     password: 'winningteam'
     // You can use a key file too, read the ssh2 documentation
};

// Use python shell
var myPythonScriptPath = 'azu_python.py';
var pyshell = new PythonShell(myPythonScriptPath);

//SSH2 file upload
var remotePathToList = '/home/team1/uploads/';
var conn = new Client();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'image.jpg')
    //cb(null, Date.now() + '_' +file.originalname)
  }
})

var upload = multer({ storage: storage })

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

      //SFTP upload a image to bitville server
      conn.on('ready', function() {
        conn.sftp(function(err, sftp) {
            if (err) throw err;

            var fs = require("fs"); // Use node filesystem
            var readStream = fs.createReadStream( "uploads/image.jpg" );
            var writeStream = sftp.createWriteStream( "/home/team1/public_html/image.jpg" );

            writeStream.on('close',function () {
              console.log( "- file transferred succesfully" );
            });

            writeStream.on('end', function () {
              console.log( "sftp connection closed" );
              conn.close();
            });

          // initiate transfer of file
          readStream.pipe( writeStream );
        });
      }).connect(connSettings);

    //VISION API PYTHON SCRIPT
    PythonShell.run('azu_python.py', function(err) {
      if (err) throw err;
      console.log('finished');
    });
    /*
    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log("Running Python script..");
      console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
      if (err){
        throw err;
        console.log(err);
      };

      console.log('finished');
    });
    */
      res.end("Ok");

    } else {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error}));
    }


  });

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)
