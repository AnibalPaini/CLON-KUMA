import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import http from "http";
import connectDB from "./db/connectDB.js";
import deviceRouter from "./routes/device.router.js";
import deviceStatsRouter from "./routes/deviceStats.router.js";
import deviceHistoryRouter from "./routes/deviceHistory.router.js";
import tagsRouter from "./routes/tags.router.js";
import pings from "./utils/ping.js";

const app = express();
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//Socket.io
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// Conexión de cliente socket
io.on("connection", (socket) => {
  console.log("Cliente conectado vía socket:", socket.id);
});
// Almacenar instancia global para emitir eventos
export { io };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/devices", deviceRouter);
app.use("/api/devicesHistory", deviceHistoryRouter);
app.use("/api/devicesStats", deviceStatsRouter);
app.use("/api/tags", tagsRouter);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

connectDB();
pings();
