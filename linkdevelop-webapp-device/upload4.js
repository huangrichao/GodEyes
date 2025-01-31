var fs = require('fs');
var schedule = require('node-schedule');
var person
var weather
const aliyunIot = require('aliyun-iot-device-sdk');
const device = aliyunIot.device({
    productKey: 'a1YHphFxZ0n',
    deviceName: 'camera3',
    deviceSecret: 'pjns9hqC6dn2FnDy2J06rNVA25DzIeQG',
});
device.on('connect', () => {
    console.log('connect successfully');
    device.serve('property/set', params => {
        console.log('receieve params:', params);
        console.log('post props:', params);
        device.postProps(params, err => {
            if (err) {
                return console.log('post error:', err);
            }
            console.log('post successfully!');
        });
    });
});
function pagination(){
    fs.readFile('camera4.json',function(err,data){
        if(err){
            console.error(err);
        }
        person = data.toString();
        person = JSON.parse(person,
            process.on('uncaughtException', function (err) {
                console.log(err);
                console.log(err.stack);
            }));
    })
    fs.readFile('weather.json',function(err,data){
        if(err){
            console.error(err);
        }
        weather= data.toString();
        weather= JSON.parse(weather,
            process.on('uncaughtException', function (err) {
                console.log(err);
                console.log(err.stack);
            }));
    })
}
function scheduleCronstyle() {
    schedule.scheduleJob('1-59 * * * * *', function () {
        pagination();
        device.postProps(person);
        device.postProps(weather);
        device.on('error', (err) =>{
            console.log('error', err);
        });
    });
}
scheduleCronstyle();