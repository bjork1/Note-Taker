//var http = require("http");
var express = require("express");
var app = express();

//var server = app.listen(3033);

var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Body Parse
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());





require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

//var server = http.createServer(handleRequest);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
/*
server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
*/
