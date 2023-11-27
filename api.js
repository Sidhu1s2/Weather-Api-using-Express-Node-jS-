const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/api.html");
});
app.post("/", function(req, res){
    const query = req.body.cityName;           //taking city name from user
    const apiKey = '43b3d436ab2f0b0feb1640396ee9de0c';
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units="+ unit;

    https.get(url, function(response){                                  //its a response for api link
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>the temprature" + temp + "</h1>")
            res.write("<p>the currentrly weather is" + weatherDescription + "</p>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
});
app.listen(3000, function(req, res){
    console.log("Srever Running on Port 3000");
});