exports.results = {
    cameraData:[{
        CameraID:"0",
        Longitude:"",
        Latitude:"",
        Timestamp:"",
        Weather:"",
        Cameralocation:"",
        Itemname:{
            itemname:"",
            itemdirection:""
        }
    },
    {
        CameraID:"1",
        Longitude:"",
        Latitude:"",
        Timestamp:"",
        Weather:"",
        Cameralocation:"",
        Itemname:{
            itemname:"",
            itemdirection:""
        }
    },
    {
        CameraID:"2",
        Longitude:"",
        Latitude:"",
        Timestamp:"",
        Weather:"",
        Cameralocation:"",
        Itemname:{
            itemname:"",
            itemdirection:""
        }
    },
    {
        CameraID:"3",
        Longitude:"",
        Latitude:"",
        Timestamp:"",
        Weather:"",
        Cameralocation:"",
        Itemname:{
            itemname:"",
            itemdirection:""
        }
    }],
    sensorData:{
        LightLux:"0",
        CurrentTemperature:"0",
        CurrentHumidity:"0",
        Barometer:"0"
    },
    discardedData:{
    },
    err:{
    }
}

exports.callback = function(val){
    //console.log(val);
    var data = this.results.err;
    val.data.forEach(valElement => {
        if(valElement.attribute == "Cameralocation"){
            switch(valElement.value){
                case "EastNorthern":
                    data = this.results.cameraData[0];
                    break;
                case ""://
                    data = this.results.cameraData[1];
                    break;
                case "Southwestern"://
                    data = this.results.cameraData[2];
                    break;
                case "NorthWestern":
                    data = this.results.cameraData[3];
                    break;
                //添加不同位置选择不同摄像头
                default:
                    data = this.results.discardedData;
                    break;
            }
        }
        else if(valElement.attribute == "LightLux"){
            data = this.results.sensorData;
        }
    })
    val.data.forEach(valElement => {
        if(valElement.attribute == "Longitude")         data.Longitude = valElement.value;
        if(valElement.attribute == "Latitude")          data.Latitude = valElement.value;
        if(valElement.attribute == "Timestamp")         data.Timestamp = valElement.value;
        if(valElement.attribute == "Weather")           data.Weather = valElement.value;
        if(valElement.attribute == "Cameralocation")    data.Cameralocation = valElement.value;
        if(valElement.attribute == "Itemname")          data.Itemname = valElement.value;

        if(valElement.attribute == "LightLux")              data.LightLux = valElement.value;
        if(valElement.attribute == "CurrentTemperature")    data.CurrentTemperature = valElement.value;
        if(valElement.attribute == "CurrentHumidity")       data.CurrentHumidity = valElement.value;
        if(valElement.attribute == "Barometer")             data.Barometer = valElement.value;
    });
}
  