const aliyunIot = require('aliyun-iot-device-sdk');
const device = aliyunIot.device({
    productKey: 'a1j8NP2ToHh',
    deviceName: 'camera1',
    deviceSecret: 'JkxvfJIFA0KwKZBrIlqfq8S0OabBHT7D',
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
device.postProps({
    Longtitude:30.24,
    Latitude:120.16
});
device.on('error', (err) =>{
    console.log('error', err);
});