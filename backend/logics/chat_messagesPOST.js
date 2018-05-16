'use strict';
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

exports.chat_messagesPOSTStart = function (req, res, results, next) {
  var url = config.mongodb.url;
  MongoClient.connect(url, function(err, db) {
    db.collection('chat_message').save(req.body, function(err, result) {
      db.close();
      next(result || {});
    });
  });

}

exports.chat_messagesPOSTEnd = function (req, res, results) {
  if (typeof results === 'object') {
    res.json(results);
  } else {
    // @todo change the type if this API doesn't return json.
    res.setHeader('Content-Type', 'application/json');
    res.end(results);
  }
}
