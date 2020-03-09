var express = require("express");
var app = express();
const fs = require("fs");
app.use(express.static("public"));
var PORT = process.env.PORT || 3000;

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

/*


var bodyParser = require("body-parser");

//const { parse } = require("querystring");

//var server = app.listen(3033);



app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Body Parse
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

//var server = http.createServer(handleRequest);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
/*

*/
