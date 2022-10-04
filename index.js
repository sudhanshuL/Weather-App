
// 596d6d280bf6a0540bf5982292f110ae
// https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=31ec2fa68457a4f0cfbdb8a9f46c974e

const http=require("http");
const fs=require("fs");
var requests=require("requests");

const homeFile=fs.readFileSync("home.html","utf-8");

const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature=temperature.replace("{%location%}",orgVal.name);
    temperature=temperature.replace("{%country%}",orgVal.sys.country);
    // console.log(temperature);
    return temperature;
}
const server=http.createServer((req,res)=>{
    if (req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=31ec2fa68457a4f0cfbdb8a9f46c974e");
        console.log("addsadasdasdasd");
        requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=31ec2fa68457a4f0cfbdb8a9f46c974e")
        .on("data",(chunk)=>{
            console.log(chunk);
            // res.write("sdasdasdadas");
            const data=JSON.parse(chunk);
            const arrData=[data];
            const realTimeData=arrData.map((val)=>{
                
                return replaceVal(homeFile,val);
            }).join("")
            res.write(realTimeData);
            
            console.log(chunk);
            // console.log(realTimeData," !!!!!!!!!");
            console.log(arrData[0].main.temp);
        })
        .on("end",(err)=>{
            if (err) return console.log("connection closed due to errors",err);
            console.log(err);
        })
    }
})

server.listen(9000,"127.0.0.1");