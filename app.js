const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); //renders all static content to the server
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url="https://us7.api.mailchimp.com/3.0/lists/ffd50ff968";
  const options={
    method:"post",
    auth:"Bhaavya18:8ecaa43a297da2fa7b97263d2e7e5e57-us7"
  };
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000, function() {
  console.log("server is running");
});
//8ecaa43a297da2fa7b97263d2e7e5e57-us7
//listid
//ffd50ff968
