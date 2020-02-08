const config = require("config");
const server = require("./server");

const port = config.get("server.port");

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
