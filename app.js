const express = require("express");
const session = require("express-session");
const redis = require("ioredis");
const redisStore = require("connect-redis")(session);

const app = express();
const clientRedis = new redis();
const PORT = process.env.PORT || 3040;

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    store: new redisStore({ client: clientRedis }),
    resave: false, // Khi request tới, đặt lại thời gian sống cookie khi hết hạn
    saveUninitialized: true, // Thiết lập header connect.sid mỗi khi request khởi tạo
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    },
  })
);

app.get("/get-session", (req, res) => {
  res.send(req.session);
});

app.get("/set-session", (req, res) => {
  req.session.user = {
    username: "Trinh Duc Toan",
    age: 30,
    email: "toantd.work@gmail.com",
  };
  res.send("Set OK!");
});

app.listen(PORT, () => {
  console.log(`The server is running ${PORT}`);
});
