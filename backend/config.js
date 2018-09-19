module.exports = {
  serverPort: process.env.PORT || 3000,
  mongodb: { url: process.env.MONGO_URL || "mongodb://mongo/cns_chat" }
};
