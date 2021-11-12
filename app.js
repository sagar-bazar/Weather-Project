const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  })

app.post("/", function(req, res){
  var city = req.body.cityName;
  const APIKey =  "420afd0554407ec3699add017712fd96";
  const URL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + APIKey + "&units=metric";
  https.get(URL, function(res1){
    console.log(res1.statusCode);

      res1.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const disp = weatherData.weather[0].description;
      console.log(disp);
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The Temperature of " + city + " is " + temp + " C</h1>");
      res.write("<p> The weather is " + disp + "</p>" );
      res.write("<img src=" + iconURL + ">");
      res.send();
    })
  })
})



app.listen(3000, function (){
  console.log("The server is running on port 3000.");
})
