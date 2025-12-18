import app from "./app";
import config from "./config/config";
import http from "http";
import { initSocket } from "./sockets/socket";

const server = http.createServer(app);

initSocket(server);

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running at ${config.URL}:${config.PORT}`);
});
