const Client = require('aliyun-api-gateway').Client;
const UUID = require('uuid');
// 用appKey和appSecret初始化客户端
const client = new Client('24952236', 'a55bb6342a5b5f9ed47124a0adffe755');

const Gateway = async ({url, apiVer, params, iotToken}) => {

    return await client.post(url, {
        data: {
            id: UUID.v1(),
            version: '1.0',
            request: {
                iotToken,
                apiVer
            },
            params: params || {}
        },
        headers: {
            accept: 'application/json'
        },
        timeout: 3000
    });

};

const params = {
    url: 'https://api.link.aliyun.com/thing/device/properties/set',
    apiVer: '1.1.0',
    params: {
        // 接口参数
        "productKey":"a1SXW9yfkj3",
        "deviceName":"0XVSX0y5UmVQPnxj6skv",
        "properties":{"Angle": 6}
}
}

Gateway(params)
    .then(res => console.log(res))
    .catch(res => console.log(res));