var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var LOCALIZATIONS_COLLECTION = "localization";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

var languages = ['English', 'French', 'German', 'Italian', 'Spanish'];

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// LCOALIZATIONS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  console.log("Message: " + message);
  console.log("code: " + code);

  res.status(code || 500).json({ "error": message });
}

/*  "/api/localization"
 *    GET: finds all localization
 *    POST: creates a new localization
 */

app.get("/api/localization", function (req, res) {
  db.collection(LOCALIZATIONS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get localization.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/localization", function (req, res) {
  var newLocalization = req.body;
  newLocalization.createDate = new Date();

  if (!req.body.string) {
    handleError(res, "Invalid user input", "Must provide a string.", 400);
  } else {
    db.collection(LOCALIZATIONS_COLLECTION).insertOne(newLocalization, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new localization.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/localization/:id"
 *    GET: find localization by id
 *    PUT: update localization by id
 *    DELETE: deletes localization by id
 */

app.get("/api/localization/:id", function (req, res) {
  db.collection(LOCALIZATIONS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get localization");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/localization/:id", function (req, res) {
  var updateDoc = req.body;
  console.log(updateDoc._id);
  db.collection(LOCALIZATIONS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: { "string": updateDoc.string, "localization": updateDoc.localization, "comment": updateDoc.comment, "language": updateDoc.language } }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update localization - " + updateDoc.string);
      console.log("error");
    } else {
      console.log(req.param.id);
      // updateDoc._id = req.params.id;
      res.status(200).json(doc);
    }
  });
});

app.delete("/api/localization/:id", function (req, res) {
  db.collection(LOCALIZATIONS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete localization");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/*  "/api/duplicate"
 *    POST: duplicate localization across languages
 */

app.post("/api/duplicate", function (req, res) {
  if (!req.body.string) {
    handleError(res, "Invalid user input", "Must provide a string.", 400);
  } else {
    var newLocalizations = [];
    for (var i = 0; i < languages.length; i++) {
      var newLocalization = JSON.parse(JSON.stringify(req.body));
      newLocalization.createDate = new Date();
      newLocalization.language = languages[i];
      newLocalizations.push(newLocalization);
    }
    db.collection(LOCALIZATIONS_COLLECTION).insertMany(newLocalizations, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new localization.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});
