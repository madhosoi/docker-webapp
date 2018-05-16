'use strict';
var url = require('url');

var chat_streamsGETLogic = require('../logics/chat_streamsGET');
var chat_streamsPOSTLogic = require('../logics/chat_streamsPOST');
var chat_messagesGETLogic = require('../logics/chat_messagesGET');
var chat_messagesPOSTLogic = require('../logics/chat_messagesPOST');

module.exports.chat_streamsGET = function chat_streamsGET (req, res, next) {
  chat_streamsGETLogic.chat_streamsGETStart(req, res, {}, function (result) {
    chat_streamsGETLogic.chat_streamsGETEnd(req, res, result);
  });
};

module.exports.chat_streamsPOST = function chat_streamsPOST (req, res, next) {
  chat_streamsPOSTLogic.chat_streamsPOSTStart(req, res, {}, function (result) {
    chat_streamsPOSTLogic.chat_streamsPOSTEnd(req, res, result);
  });
};

module.exports.chat_messagesGET = function chat_messagesGET (req, res, next) {
  chat_messagesGETLogic.chat_messagesGETStart(req, res, {}, function (result) {
    chat_messagesGETLogic.chat_messagesGETEnd(req, res, result);
  });
};

module.exports.chat_messagesPOST = function chat_messagesPOST (req, res, next) {
  chat_messagesPOSTLogic.chat_messagesPOSTStart(req, res, {}, function (result) {
    chat_messagesPOSTLogic.chat_messagesPOSTEnd(req, res, result);
  });
};

