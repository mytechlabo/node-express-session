const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3050;

app.get("/get-cookie", (req, res) => {
  // const cookies = req.headers.cookie; // No using cookie-parser
  const cookies = req.cookies;
  res.send(cookies);
});

app.get("/set-cookie", (req, res) => {
  // res.setHeader("set-cookie", "cart={id: 10, name: 'banh pao', price: 1000}"); // No using cookie-parser

  res
    .cookie("blog", "https://viblo.asia/", {
      maxAge: 5 * 1000,
      // expires: new Date(Date.now() + 5 * 1000),
      httpOnly: false,
    })
    .cookie("cart", "{id: 10, name: 'banh pao', price: 1000}", {
      maxAge: 5 * 1000,
      httpOnly: true,
      secure: true,
    });
  res.send("Set OK!");
});

app.get("/del-cookie", (req, res) => {
  res.clearCookie("cart");
  res.send("Del OK!");
});

app.listen(PORT, () => {
  console.log(`The server is running ${PORT}`);
});
