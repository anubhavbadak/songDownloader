var http = require("http");
const fs = require("fs");
let url = require("url");
//this is a server i was trying to make for my project but it isnt working 


http.createServer(function(req,res){
    if(req.url === "/form"){
        console.log("in request");

        res.writeHead(200,{"Content-Type":"text/html"});
         fs.createReadStream("./public/songDownloader.html", "UTF-8").pipe(res);

         //res.end(songDownloader.html);
         console.log("html page loaded");

         if(req.method === "GET"){
             var q = url.parse(req.url, true);
             console.log(q);
         }
}
}).listen(3000);
