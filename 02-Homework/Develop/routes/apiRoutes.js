var notesData = require("../db/db.json");

const { parse } = require("querystring");
const fs = require("fs");
var path = require("path");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  /*

  app.post("/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    let note_title = req.body.title;
    let note_text = req.body.textarea;
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
*/
  //Notes

  //app.use(express.static("public"));

  //app.get("/", (req, res, next) => {
  // res.status(200).sendFile(__dirname + "/public/index.html");
  //});

  //app.get("/notes", (req, res, next) => {
  //res.status(200).sendFile(__dirname + "/public/notes.html");
  //});

  app.get("/api/notes", (req, res, next) => {
    try {
      fs.readFile(__dirname + notesData, "utf-8", (err, data) => {
        if (err) {
          throw Error(err);
        }

        const jsonData = JSON.parse(data);
        res.status(200).send(jsonData);
      });
    } catch (err) {
      console.error(err);
      res.status(404).send();
    }
  });

  app.post("/api/notes", (req, res, next) => {
    // Parse incoming request body
    let body = "";
    req
      .on("data", data => {
        body += data.toString();
      })
      .on("end", () => {
        const newNote = parse(body);

        if (Object.keys(newNote).length !== 0) {
          fs.readFile(__dirname + notesData, "utf-8", (err, data) => {
            if (err) {
              throw err;
            }

            data = JSON.parse(data);
            // Set new notes id
            newNote.id = data.length;
            data.push(newNote);

            fs.writeFile(__dirname + notesData, JSON.stringify(data), err => {
              if (err) throw err;
              console.log("Success.");
            });
          });
          res.send(newNote);
        } else {
          throw new Error("Something went wrong.");
        }
      });
  });

  app.delete("/api/notes/:id", (req, res, next) => {
    // Get the id of the note being deleted
    const id = req.params.id;
    fs.readFile(__dirname + notesData, "utf-8", (err, notes) => {
      if (err) {
        throw err;
      }

      notes = JSON.parse(notes);
      // Loop through the notes array to match the note that is being deleted
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(id)) {
          notes.splice(i, 1);
        }
      }
      // Rewrite the updated notes array
      fs.writeFile(__dirname + notesData, JSON.stringify(notes), err => {
        if (err) throw err;

        console.log("Success.");
      });
    });

    res.send("Deleted.");
  });
};
