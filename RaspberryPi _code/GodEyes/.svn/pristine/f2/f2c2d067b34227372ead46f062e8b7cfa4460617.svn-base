import { Chart, Tooltip, Axis, SmoothLine, Edge } from 'viser-react';
import * as React from 'react';
const Results = require('../dealdata/Results.js');
const result = Results.results;
import moment from 'moment'
var now=Date.now()-20*5*1000;
var firstTime=moment(now).format(' HH:mm:ss')+"";
const data = [
  { time: firstTime, value: 29},
  { time: moment(now+5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+2*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+3*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+4*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+5*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+6*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+7*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+8*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+9*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+10*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+11*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+12*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+13*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+14*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+15*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+16*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+17*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+18*5*1000).format(' HH:mm:ss')+"", value: 29},
  { time: moment(now+19*5*1000).format(' HH:mm:ss')+"", value: 29},
];


const scale = [{
  dataKey: 'value',
  alias: '温度',
  min:28,
  max:38,
  tickInterval: 1,
  
},{
  dataKey: 'time',
  min: 0,
  max: 1,
  
}];
const getTemperature = () => {
    let result = [];
    result=data;
    return result;
};

export default class App extends React.Component {
   
    state = {
        temperature:getTemperature(),
    }
    treat(){
    const {temperature} = this.state;
    var times =moment(Date.now()).format(' HH:mm:ss')+"";
    temperature.push({
      time:times,
      value:result.sensorData.CurrentTemperature
      });
    temperature.splice(0,1);
    this.setState({
       temperature
     });
    }
    componentDidMount() {
      setInterval(()=> this.treat(),5000);
   }
   render() {
    return (
      <Chart forceFit height={400} data={this.state.temperature} scale={scale} >
        <Tooltip />
        <Edge position="time*value"/>
        <Axis />
        <SmoothLine position="time*value" />
      </Chart>
    );
  }
}
