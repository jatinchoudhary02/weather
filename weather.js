const express=require("express");
const app=express();
const https=require("https");
const bodyparser=require("body-parser");
  app.use(express.static("public"));



app.use(bodyparser.urlencoded({
  extended:true
}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/weather.html");

});


app.post("/",function(req,res){
  const m=String(req.body.city);


   const url ="https://api.openweathermap.org/data/2.5/weather?q="+m+"&appid=97e38b49060d8e13755b43cf6d1f24d9&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
    const t=weatherdata.main.temp;

      const description=weatherdata.weather[0].description;
      const icon=weatherdata.weather[0].icon;
      const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>temp is"+t+"</h1>");
        res.write("<p> weather is"+ description +"</p>");
      res.write("<img src ="+ imageurl+ ">");
        res.send();



    });
  });

});







app.listen(process.env.PORT||2001,function(){
  console.log("bhaichara");
});
