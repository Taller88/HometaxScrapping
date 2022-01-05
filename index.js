var express = require('express');
var bodyParser = require('body-parser');
var webInput = require('./routes/hometax');
 
 
var app = express();  

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use('/', webInput);


// 3000 port open
app.listen(3000, function(){
    console.log("[Server] 3000 port open");
    
});

// '/' URL hostring 
app.get("/", function(req, res){
    console.log("nodeJS URL Routing Test");
    console.log("dirName: "+__dirname);
    
    console.log("Form file loaded!");
    res.sendFile(__dirname+"/public/html/main.html");   
});



module.exports = app;