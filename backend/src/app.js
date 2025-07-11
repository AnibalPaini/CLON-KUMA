import express from "express"
import connectDB from "./db/connectDB.js";
import deviceRouter from "./routes/device.router.js"
import pings from "./utils/ping.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/devices", deviceRouter)

app.listen(port, () => {
  console.log(`http://localhost:port`);
});

connectDB()
pings()
