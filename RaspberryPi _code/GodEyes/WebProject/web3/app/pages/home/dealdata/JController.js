const Client = require('aliyun-api-gateway').Client;                                                        //用于调用callback(val)
const UUID = require('uuid');
const Results = require('./Results.js');      
const Keys = require('./Keys.js');
const GODEYES_WEB_PROJECT_APPKEY = Keys.GODEYES_WEB_PROJECT_APPKEY;
const GODEYES_WEB_PROJECT_APPSECRET = Keys.GODEYES_WEB_PROJECT_APPSECRET;
const client = new Client(GODEYES_WEB_PROJECT_APPKEY,GODEYES_WEB_PROJECT_APPSECRET);

exports.setThingProperties = async function(ProductKey,DeviceName,Items){                         //物的管理服务-设置物的属性
    const Gateway = async ({url, apiVer, params, iotToken}) => {
        return await client.post(url, {
            data: {
                id: UUID.v1(),
                version: '1.0', 
                request: {
                    iotToken,
                    apiVer:'1.1.0'
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
            "productKey":ProductKey,
            "deviceName":DeviceName,
            "properties":Items
        }
    }
    Gateway(params)
        .then().catch();
}


exports.queryThingStatusList = async function(ProductKey,DeviceName){                             //物的管理服务-查询设备属性状态列表
    const Gateway = async ({url, apiVer, params, iotToken}) => {
        return await client.post(url, {
            data: {
                id: UUID.v1(),
                version: '1.0',
                request: {
                    iotToken,
                    apiVer: '1.0.1'
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
        url: 'http://api.link.aliyun.com/thing/device/status/query',
        apiVer: '1.0.1',
        params: {
            "ProductKey":ProductKey,
            "DeviceName":DeviceName
        }
    }
    Gateway(params)
        .then(res => Results.callback(res))
        .catch(res => Results.callback(res));
}

exports.iotxDatacenterQuery1 = async function(dataQueryJson){                                     //数据表服务-数据查询
    const Gateway = async ({url, apiVer, params, iotToken}) => {
        return await client.post(url, {
            data: {
                id: UUID.v1(),
                version: '1.0',
                request: {
                    iotToken,
                    apiVer:'1.1.0'
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
        url: 'https://api.link.aliyun.com/datacenter/data/query',
        apiVer: '1.1.0',
        params: {
            "dataQueryJson":dataQueryJson,
            "userContextDTO":{} //此属性为空
        }
    }
    Gateway(params)
        .then(res => Results.callback(res))
        .catch(res => Results.callback(res));
}



//以下由于弹窗问题不使用
//import { APIGateway } from "@bone/linkdevelop-sdk";
/*
exports.queryThingStatusList = function(ProductKey,DeviceName){                             //物的管理服务-查询设备属性状态列表
    APIGateway.request("http://api.link.aliyun.com/thing/device/status/query", {
        version: "1.0.1",
        data: {
            ProductKey:ProductKey,
	        DeviceName:DeviceName
        }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
})
}

exports.setThingProperties = function(ProductKey,DeviceName,Items){                         //物的管理服务-设置物的属性
    APIGateway.request("https://api.link.aliyun.com/thing/device/properties/set", {
        version: "1.0.1",
        data: {
            ThingId:{
                productKey:ProductKey,
                deviceName:DeviceName
            },
	        Items:Items
        }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
})
}

exports.getThingProperties = function(ProductKey,DeviceName){                               //物的管理服务-获取物的全量属性快照数据
    APIGateway.request("https://api.link.aliyun.com/thing/device/properties/query", {       //高版本的this.queryThingStatusList()
    version: "1.1.0",
    data: {
        productKey:ProductKey,
	    deviceName:DeviceName
    }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}

exports.iotxDatacenterQuery1 = function(dataQueryJson){                                     //数据表服务-数据查询
    APIGateway.request("https://api.link.aliyun.com/datacenter/data/query", {
    version: "1.1.0",
    data: {
        // 接口参数
        "dataQueryJson":dataQueryJson,
	    "userContextDTO":"{}"
    }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
}*/