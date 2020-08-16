const express = require("express");

// here to save the url that taken from postman to a var .
const https = require("https");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")

  // res.send("Server is up and running")
})


app.post("/", function(req, res) {

  // here we use it .
  // const url = "https://api.openweathermap.org/data/2.5/weather?q=Melbourne&appid=bdda414d87854957683689a1dbca61fb&units=metric";

  // const query = "London";
  const query = req.body.cityName;
  const apiKey = process.env['API_KEY'];
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;


  https.get(url, function(response) {
    // console.log(response);

    // console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // just the temp
      const temp = weatherData.main.temp;
      // pring full JSON
      // console.log(weatherData);

      // pring the temp only
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      // icon from JSON.
      const icon = weatherData.weather[0].icon;
      // the icon of the image that taken from the API.
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";



      // because we wanna send it back to the user .

      // it gonna print everything
      res.write("<p> the weather is currently " + weatherDescription + " </p>")
      res.write("<h1>the temperature in " + query +  " is " + temp + "</h1>");
      res.write("<img src=" + imageURL + ">")

      res.send();


    })
  });




  // console.log(req.body.cityName);
})









// app.listen(3000, function() {
//   console.log("server is running on port 3000");
// });

// to make it in any port and 3000 locally
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
