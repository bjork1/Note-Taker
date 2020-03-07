var notesData = require("../db/db.json");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  app.post("/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    const fs = require("fs");
    let note_title = req.body.title;
    let note_text = req.body.text;
    console.log(note_text);
    console.log(note_title);
    const customer = {
      title: note_title,
      text: note_text
    };

    var configFile = fs.readFileSync("./db/db.json");
    var config = JSON.parse(configFile);
    config.push(customer);
    var configJSON = JSON.stringify(config);
    fs.writeFileSync("./db/db.json", configJSON);

    var notesDisplay = 
    console.log(customer);


    app.post('/data', function(req, res) {
        var a = parseFloat(req.body.num1);
        var b = parseFloat(req.body.num2);
        res.send(sum.toString());
    
    })



  });
};
