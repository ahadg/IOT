const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require("path");
app.use(express.json());
const cors = require("cors");
app.use(cors());

dotenv.config({path:'./config.env'});
require(`./db/conn`);

app.use(express.static(path.join(__dirname, "public")));
// routes
app.use(require('./router/user'));
app.use(require('./router/chat'));
app.use(require('./router/activity'));

const WebSocket = require("ws");
const http = require("http").createServer(app);
const wss = new WebSocket.Server({ server: http });

const connectws = require('./websocket/websocket')
// connect with websocket
connectws(wss)
// mqtt
require('./mqtt/mqtt')

app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );

const PORT = process.env.PORT;
http.listen(PORT, () => {
    console.log(
      `Server is running on PORT${PORT} in ${process.env.NODE_ENV} mode`
    );
});
  