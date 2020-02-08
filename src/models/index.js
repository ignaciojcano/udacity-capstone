const config = require("config");
const mongoose = require("mongoose");

mongoose.connect(config.get("db.uri"), { useNewUrlParser: true });

module.exports = mongoose;
