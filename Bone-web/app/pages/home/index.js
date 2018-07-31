import React, { Component } from "react";
import style from "./index.css";
import ShowTime from "./component/ShowTime";
import { Tab,Table,Dialog, Button, Checkbox ,NumberPicker,Range,  Grid} from '@bone/bone-web-ui';
import Chart from "./component/Chart";
const TabPane = Tab.TabPane;
const JController = require('./dealdata/JController.js');
const Results = require('./dealdata/Results.js');
const result = Results.results;
const Keys = require('./dealdata/Keys.js');
const { Row, Col } = Grid;
const { Group } = Checkbox;
const  getCameraData = () => {                          // 初始化摄像头数据
        let result = [];
        for (let i = 0; i <=3; i++) {
            result.push({
                cameraID:i,
                cameralocation:'Waiting',
                longitude:'Waiting',
                latitude:'Waiting',
                timestamp:'Waiting',
                weather:'Waiting',
                itemname:'Waiting',
                itemdirection:'Waiting',
                state:'Waiting'
            });
        }    
        return result;
    };
const cols = [{
        title: '摄像头编号',
        dataIndex: 'cameraID'
    }, {
        title: '摄像头位置',
        dataIndex: 'cameralocation'
    },{
        title: '经度(°)',
        dataIndex: 'longitude'
    }, {
        title: '纬度(°)',
        dataIndex: 'latitude'
    },{
        title: '时间',
        dataIndex: 'timestamp'
    },{
        title: '天气',
        dataIndex: 'weather'
    },{
        title: '对象',
        dataIndex: 'itemname'
    },{
        title: '去向',
        dataIndex: 'itemdirection'
    },{
        title: '状态',
        dataIndex: 'state'
    }];
const direction=[{
    left:'向北',
    right:'向东'      
},{
    left:'向东',
    right:'向南'
},{
    left:'向南',
    right:'向西'
},{
    left:'向西',
    right:'向北'
}];

const  getSensorData = () => {                                          // 初始化传感器的数据
        let result1 = [];
        result1.push({
            Pressure:'Waiting',
            CurrentHumidity:'Waiting',
            CurrentTemperature:'Waiting',
            LightLux:'Waiting'
        });
        return result1;
    }    
export default class App extends React.Component {
    state = {
        cameraDataSource: getCameraData(),
        sensorDataSource: getSensorData(),
        valueInt0:0,
        valueInt1:0,
        valueInt2:0,
        valueInt3:0,
        cols: cols
    }
    treat(){                                                                                                            // 给表1,2的数据赋值
        JController.queryThingStatusList(Keys.GODEYES_CAMERA_0_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_0_DEVICE_NAME);
        JController.queryThingStatusList(Keys.GODEYES_CAMERA_1_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_1_DEVICE_NAME);
        JController.queryThingStatusList(Keys.GODEYES_CAMERA_2_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_2_DEVICE_NAME);
        JController.queryThingStatusList(Keys.GODEYES_CAMERA_3_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_3_DEVICE_NAME);
        JController.queryThingStatusList(Keys.GODEYES_SENSOR_DEVICE_PRODUCT_KEY ,Keys.GODEYES_SENSOR_DEVICE_NAME);
        const {cameraDataSource} = this.state;
        const {sensorDataSource} = this.state;
        for(let i = 0;i<=3;i++)
        {   
            cameraDataSource[i].cameralocation = result.cameraData[i].Cameralocation;
            cameraDataSource[i].longitude = result.cameraData[i].Longitude;
            cameraDataSource[i].latitude = result.cameraData[i].Latitude;
            cameraDataSource[i].timestamp = result.cameraData[i].Timestamp;
            cameraDataSource[i].weather = result.cameraData[i].Weather;
            cameraDataSource[i].itemname = result.cameraData[i].Itemname.itemname;
            if(result.cameraData[i].Itemname.itemdirection>320){
                cameraDataSource[i].itemdirection = direction[i].right;
            }
            else{
                cameraDataSource[i].itemdirection = direction[i].left;
            }
            if(Date.now() - (new Date(cameraDataSource[i].timestamp)).getTime()>30*1000||!cameraDataSource[i].timestamp){
                cameraDataSource[i].state = '离线';
            }
            else{
                cameraDataSource[i].state = '在线';
            }
        }
       
        sensorDataSource[0].Pressure = result.sensorData.Barometer;
        sensorDataSource[0].CurrentHumidity = result.sensorData.CurrentHumidity;
        sensorDataSource[0].CurrentTemperature = result.sensorData.CurrentTemperature;
        sensorDataSource[0].LightLux = result.sensorData.LightLux;
        this.setState({
            cameraDataSource,
            sensorDataSource
        });
        console.log(result);
    }

    componentDidMount() {                                           // 重复执行赋值
        setInterval(()=> this.treat(), 1000);
    }

    renderControlContent() {
        const groupSource = cols.map(col => {
                return {
                    label: col.title,
                    value: col.dataIndex
                };
            }), defaultValue = this.state.cols.map(col => col.dataIndex);
        return <Group dataSource = {groupSource} onChange = {this.onChange} defaultValue = {defaultValue}/>;
    }

    onChange = (value) => {                                                             // 选择按钮弹出的弹窗选择列
        this.changedCols = cols.filter(col => value.indexOf(col.dataIndex) > -1);
    }
    render(){                                                                           //渲染界面
        return <div className={style.container}>
        <br/>
        <center><ShowTime ></ShowTime></center>
        <Tab type="capsule" tabPosition="top" >
            <TabPane tab = "实时捕捉显示表" key = "1">
                   <p className={style.myp1}>实时捕捉显示表</p>
                   <br/>
                   <Button onClick={this.openDialog} type="primary"> 选择对比列 </Button>
                   <br/>
                   <br/>
                   <br/>
                    <Table dataSource={this.state.cameraDataSource}  isZebra={true}>
                        {this.renderCols()}
                    </Table>
            </TabPane>
            <TabPane tab = "实时环境显示" key = "2">
                    <p className={style.myp1}>实时环境显示</p>
                    <br/>
                    <Table dataSource = {this.state.sensorDataSource} >
                        <Table.Column title="气压(Pa)" dataIndex = "Pressure" />
                        <Table.Column title="当前湿度(%RH)" dataIndex = "CurrentHumidity" />
                        <Table.Column title="温度(°C)" dataIndex = "CurrentTemperature"/>
                        <Table.Column title="光强(cd)" dataIndex = "LightLux"/>
                    </Table>
            </TabPane>
            <TabPane tab = "实时温度显示" key = "3">
                <p className={style.myp1}>实时温度显示</p>
                <br/>
                <Chart></Chart>
            </TabPane>
            <TabPane tab = "角度设置" key = "4">
                <p className={style.myp1}>调整角度</p>
                <br/>
                <br/>
                <Row justify='center'>
                    <Col fixedSpan="8" className={style.myp2}>摄像头0调整的角度:</Col>
                    <Col fixedSpan="30" style={{marginTop: '10px'}}>
                        <Range value={this.state.valueInt0} min={-90} max={90} step={30} tipFormatter={this.formatter.bind(this)}
                               onChange={this.onChangeInt0.bind(this)}
                                marks={{'-90':'左转90°','-60':'左转60°','-30':'左转30°',0:'正前方',30:'右转30°',60:'右转60°',90:'右转90°'}}
                         />
                    </Col>
                    <Col fixedSpan="8">
                        <NumberPicker value={this.state.valueInt0} min={-90} max={90} step={30}  editable={false}
                        inputWidth={'60px'} onChange={this.onChangeInt0.bind(this)} />
                    </Col>
                    <Col fixedSpan="8">
                        <Button type="primary"  onClick={this.showSettingTextZero.bind(this,this.state.valueInt0)} >设置</Button>
                    </Col>
                </Row> 
                <br/>
                <br/>
                <br/>
                <Row justify='center'>
                    <Col fixedSpan="8" className={style.myp2}>摄像头1调整的角度:</Col>
                    <Col fixedSpan="30" style={{marginTop: '10px'}}>
                        <Range value={this.state.valueInt1} min={-90} max={90} step={30} tipFormatter={this.formatter.bind(this)}
                               onChange={this.onChangeInt1.bind(this)}
                                marks={{'-90':'左转90°','-60':'左转60°','-30':'左转30°',0:'正前方',30:'右转30°',60:'右转60°',90:'右转90°'}
                            }
                         />
                    </Col>
                    <Col fixedSpan="8">
                        <NumberPicker value={this.state.valueInt1} min={-90} max={90} step={30}  editable={false}
                        inputWidth={'60px'} onChange={this.onChangeInt1.bind(this)} />
                    </Col>
                    <Col fixedSpan="8">
                        <Button type="primary"  onClick={this.showSettingTextOne.bind(this,this.state.valueInt1)} >设置</Button>
                    </Col>
                </Row> 
                <br/>
                <br/>
                <br/>
                <Row justify='center'>
                    <Col fixedSpan="8" className={style.myp2}>摄像头2调整的角度:</Col>
                    <Col fixedSpan="30" style={{marginTop: '10px'}}>
                        <Range value={this.state.valueInt2} min={-90} max={90} step={30} tipFormatter={this.formatter.bind(this)}
                               onChange={this.onChangeInt2.bind(this)}
                                marks={{'-90':'左转90°','-60':'左转60°','-30':'左转30°',0:'正前方',30:'右转30°',60:'右转60°',90:'右转90°'}}
                         />
                    </Col>
                    <Col fixedSpan="8">
                        <NumberPicker value={this.state.valueInt2} min={-90} max={90} step={30}  editable={false}
                        inputWidth={'60px'} onChange={this.onChangeInt2.bind(this)} />
                    </Col>
                    <Col fixedSpan="8">
                        <Button type="primary"   onClick={this.showSettingTextTwo.bind(this,this.state.valueInt2)} >设置</Button>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row justify='center'>
                    <Col fixedSpan="8" className={style.myp2}>摄像头3调整的角度:</Col>
                    <Col fixedSpan="30" style={{marginTop: '10px'}}>
                        <Range value={this.state.valueInt3} min={-90} max={90} step={30} tipFormatter={this.formatter.bind(this)}
                               onChange={this.onChangeInt3.bind(this)}
                                marks={{'-90':'左转90°','-60':'左转60°','-30':'左转30°',0:'正前方',30:'右转30°',60:'右转60°',90:'右转90°'}}
                         />
                    </Col>
                    <Col fixedSpan="8">
                        <NumberPicker value={this.state.valueInt3} min={-90} max={90} step={30}  editable={false}
                        inputWidth={'60px'} onChange={this.onChangeInt3.bind(this)} />
                    </Col>
                    <Col fixedSpan="8">
                        <Button type="primary" value={this.state.valueInt3 } onClick={this.showSettingTextThree.bind(this,this.state.valueInt3)} >设置</Button>
                    </Col>
                </Row> 
            </TabPane>
        </Tab>
        </div>
    }
    openDialog = () => {                                                                // 点击选择对比例按钮后的弹窗
        Dialog.alert({
            needWrapper: false,
            content: this.renderControlContent(),
            title: '选择对比显示的列',
            onOk: () => {
                this.setState({
                    cols: this.changedCols
                });
            }
        });
    }
    renderCols() {                                                                      // 渲染摄像头数据表的列
        const {cols} = this.state;
        return cols.map(col => {
            return <Table.Column title={col.title} dataIndex={col.dataIndex} key={col.dataIndex} />;
        });
    }
    onChangeInt0(value) {                                                               // 设置摄像头1的角度，以下同理
        this.setState(Object.assign({}, this.state, {
            valueInt0: value
        }));
    }
    onChangeInt1(value) {
        this.setState(Object.assign({}, this.state, {
            valueInt1: value
        }));
    }
    onChangeInt2(value) {
        this.setState(Object.assign({}, this.state, {
            valueInt2: value
        }));
    }
    onChangeInt3(value) {
        this.setState(Object.assign({}, this.state, {
            valueInt3: value
        }));
    }
    formatter(value) {                                         
        if(value>0){
            return '向右转'+value+'度';
        }
        else if(value==0){
            return '正前方';
        }
        else{
            value=Math.abs(value);
            return '向左转'+value+'度';
        }
    }
    getAngle(value){                                      // 转译摄像头转动角度
        if(value == -30){
            return 1;
        } 
        else if(value == 30){
            return 2;
        }
        else if(value == -60){
            return 3;
        }
        else if(value == 60){
            return 4;
        }
        else if(value == -90){
            return 5;
        }
        else if(value == 90){
            return 6;
        }
        else{
            return 7;
        }
    }
    showSettingTextZero(value) {                                // 设置角度界面的设置按钮点击后的触发时间
        Dialog.alert({
          title: '提示',
          content: '设置成功'
        });
        var a=this.getAngle(value);
        console.log(a);
        JController.setThingProperties(Keys.GODEYES_CAMERA_0_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_0_DEVICE_NAME,{Angle:a});
    }
    showSettingTextOne(value) {                                // 设置角度界面的设置按钮点击后的触发时间
        Dialog.alert({
          title: '提示',
          content: '设置成功'
        });
        var a=this.getAngle(value);
        console.log(a);
        JController.setThingProperties(Keys.GODEYES_CAMERA_1_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_1_DEVICE_NAME,{Angle:a});
    }
    showSettingTextTwo(value) {                                // 设置角度界面的设置按钮点击后的触发时间
        Dialog.alert({
          title: '提示',
          content: '设置成功'
        });
        var a=this.getAngle(value);
        console.log(a);
        JController.setThingProperties(Keys.GODEYES_CAMERA_2_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_2_DEVICE_NAME,{Angle:a});
    }
    showSettingTextThree(value) {                                // 设置角度界面的设置按钮点击后的触发时间
        Dialog.alert({
          title: '提示',
          content: '设置成功'
        });
        var a=this.getAngle(value);
        console.log(a);
        JController.setThingProperties(Keys.GODEYES_CAMERA_3_DEVICE_PRODECT_KEY,Keys.GODEYES_CAMERA_3_DEVICE_NAME,{Angle:a});
    }
}