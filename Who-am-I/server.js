var express = require("express");
var app = express();
const port = process.env.PORT || 3000;

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.set("trust proxy", true);
app.get("/api/whoami", (req, res) => {
  const userIp = req.ip;
  const userLanguage = req.headers["accept-language"];
  const userSoftware = req.headers["user-agent"];
  return res.json({
    ipaddress: userIp,
    language: userLanguage,
    software: userSoftware,
  });
});
app.get("/api", (req, res) => {
    return res.json({
        ipaddress: 'Your ip address',
        language: 'Your preferred langauge',
        software: 'Your software'
    })
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`App is listening on port ${port}`);
});
