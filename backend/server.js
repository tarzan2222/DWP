var calc = require("./calc");

var express = require("express");
var cors = require('cors');
var axios = require("axios");

var app = express();
app.use(cors());
var url = "https://bpdts-test-app.herokuapp.com/";

var results = [];
app.get("/near-london", (req, res, next) => {
  results = [];
  axios.get(`${url}users`, {}).then((resServer) => {
    resServer.data.forEach((element) => {
      var dist = calc.calcDistance(element.latitude, element.longitude);
      if (dist < 50) {
        element.distance = `${dist.toFixed(1)} miles from London`;
        results.push(element);
      }
    });
    res.json(results);
  });
});

app.get("/london", (req, res, next) => {
  results = [];
  axios.get(`${url}city/London/users`, {}).then((resServer) => {
    resServer.data.forEach((element) => {
        element.distance = "In London";
        results.push(element);
    });

    res.json(results);
  });
});

app.get("/user", (req, res, next) => {
  axios.get(`${url}/user/22`, {}).then((resServer) => {
    res.json(resServer.data);
  });
});


app.get("*", (req, res, next) => {
  axios.get(`${url}`, {}).then((resServer) => {
    res.json("Please specify route '/nearLondon' or '/London'");
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
