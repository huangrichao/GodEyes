var fs = require('fs');
var schedule = require('node-schedule');
var person
const aliyunIot = require('aliyun-iot-device-sdk');
const device = aliyunIot.device({
    productKey: 'a1oo11FmXZN',
    deviceName: 'camera',
    deviceSecret: '0EfAdRjFKutwcoafDjKueFEbvkyVAEXw',
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
    device.postProps(person);
});
function pagination(){
    fs.readFile('weather.json',function(err,data){
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
}
function scheduleCronstyle() {
    schedule.scheduleJob('1 1 1 * * *', function () {
        pagination();
        device.postProps(person);
        device.on('error', (err) =>{
            console.log('error', err);
        });
    });
}
scheduleCronstyle();