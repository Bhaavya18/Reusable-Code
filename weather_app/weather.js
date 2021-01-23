const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
  //res.send("Server is running");  //we can not have two send in app.get fuction as it marks the end
});
app.post("/",function(req,res){
  const city=req.body.cityName;
  var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=6eb4d4a058d088a57b38ee3d541961bc&units=metric";
  https.get(url,function(response){
    response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const description=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The temperature in "+city+" is "+temp+" degree celcius</h1>");
    res.write("<p>The weather is currently "+description+"</p>");
    res.write("<img src="+imageURL+" alt='weather'>");
    res.send();
    });
  });
});
/*var url="https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=6eb4d4a058d088a57b38ee3d541961bc&units=metric";
https.get(url,function(response){
  response.on("data",function(data){
  const weatherData=JSON.parse(data);
  const temp=weatherData.main.temp;
  const description=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
  res.write("<h1>The temperature in Delhi is "+temp+" degree celcius</h1>");
  res.write("<p>The weather is currently "+description+"</p>");
  res.write("<img src="+imageURL+" alt='weather'>");
  res.send();
  });
});*/
app.listen(3000,function(){
  console.log("server is running");
});
