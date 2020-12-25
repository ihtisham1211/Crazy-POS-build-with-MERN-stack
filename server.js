const express = require("express");
const connectToDb = require("./Database/db");
var cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

//init express
const app = express();
//for middleware intigration
app.use(cors());
//connecting to online db atlus
connectToDb();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/user", require("./routers/user"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/product", require("./routers/product"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
