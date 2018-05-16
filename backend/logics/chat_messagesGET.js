'use strict';
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

exports.chat_messagesGETStart = function (req, res, results, next) {
  
  var url = config.mongodb.url;
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var filter = req.query.filter ? JSON.parse(req.query.filter) : '';
    var where = filter ? filter.where : {};
    db.collection('chat_message').find(where).toArray(function(err, result) {
      db.close();
      next(result || {});
    });
  });

}

exports.chat_messagesGETEnd = function (req, res, results) {
  if (typeof results === 'object') {
    res.json(results);
  } else {
    // @todo change the type if this API doesn't return json.
    res.setHeader('Content-Type', 'application/json');
    res.end(results);
  }
}
