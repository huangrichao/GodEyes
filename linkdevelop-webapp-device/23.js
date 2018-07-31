/**
 * Created by Turne on 2017/2/15.
 */
var http =  require('http');
var url = "";
var city = require("./cityData");
var schedule=require("node-schedule");
var weather='';
url = "http://www.weather.com.cn/weather1d/101210601.shtml"
var a = getCityData(url);
function getCityData(url) {
    http.get(url, function (res) {//通过上面传过来的url来获取该天气信息的数据
        var jsonData = '';
        res.on("data", function (data) {
            jsonData += data.toString('utf8');//保存天气信息的数据
        })
        res.on("end", function () {
            jsonData = JSON.parse(jsonData);//因为获取到的天气信息数据是JSON格式的，通过JSON.parse函数进行解析，得到一个对象
            //输出天气的信息
            console.log(jsonData);
            weather= jsonData.weatherinfo.weather;
        })
    })
    return weather;
}


