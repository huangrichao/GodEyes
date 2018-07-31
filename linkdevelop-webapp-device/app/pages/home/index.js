import React, { Component } from 'react';
import { Button, Switch, Form, Grid, Input, Dialog } from '@bone/bone-web-ui';
import IotGateway from '@bone/iot-gateway';
import { HuePicker } from 'react-color';

const Row = Grid.Row;
const Col = Grid.Col;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 12
  },
  wrapperCol: {
    span: 12
  }
};
const insetLayout = {
  labelCol: { fixedSpan: 4 }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: false,
      color: '',
      // 刷新页面不用重复输入
      productKey: localStorage.getItem('productKey') || '',
      deviceName: localStorage.getItem('deviceName') || ''
    };
    // 获取初始数据
    this.getProps(props => {
      this.setState({
        switch: props.LightSwitch === 1,
        color: rgbToHex(
          props.RGBColor.Red,
          props.RGBColor.Green,
          props.RGBColor.Blue
        )
      });
    });
  }
  getProps(cb) {
    IotGateway.post({
      url: 'https://api.link.aliyun.com/thing/device/status/query',
      apiVer: '1.0.1',
      params: {
        ProductKey: this.state.productKey,
        DeviceName: this.state.deviceName
      }
    }).then(res => {
      if (res.code !== 200) {
        throw new Error(res.localizedMsg || res.message);
      }
      let props = {};
      res.data.forEach(item => {
        props[item.attribute] = item.value;
      });
      if (cb) {
        cb(props);
      }
      console.log('get props successfully:', props);
    });
  }
  setProps(props) {
    IotGateway.post({
      url: 'https://api.link.aliyun.com/thing/device/properties/set',
      apiVer: '1.0.1',
      params: {
        ThingId: {
          productKey: this.state.productKey,
          deviceName: this.state.deviceName
        },
        Items: props
      }
    }).then(res => {
      if (res.code !== 200) {
        throw new Error(res.localizedMsg || res.message);
      }
      console.log(res);
    });
  }
  showValidationText() {
    Dialog.alert({
      title: '提示',
      content: '请输入设备的 productKey 和 deviceName 才能控制设备哦'
    });
  }
  onChange = checked => {
    if (!this.state.productKey || !this.state.deviceName) {
      this.showValidationText();
      return;
    }
    this.setState({
      switch: checked
    });
    this.setProps({
      LightSwitch: checked ? 1 : 0
    });
  };
  onInput = (field, value) => {
    this.state[field] = value;
    localStorage.setItem(field, value);
    this.setState({
      [field]: value
    });
  };
  onColorChange = color => {
    if (!this.state.productKey || !this.state.deviceName) {
      this.showValidationText();
      return;
    }
    this.setState({
      color: color.hex
    });
    this.setProps({
      RGBColor: hexToRgb(color.hex)
    });
  };
  render() {
    return (
      <div style={{ padding: '30px 0 0 30px' }}>
        <Form style={{ margin: '0 0 0 30px' }} {...formItemLayout}>
          <FormItem label="设备 id">
            <Row>
              <Col>
                <FormItem
                  label="productKey"
                  required={false}
                  labelAlign="inset"
                  {...insetLayout}
                >
                  <Input
                    placeholder="请输入"
                    value={this.state.productKey}
                    onChange={value => this.onInput('productKey', value)}
                  />
                </FormItem>
              </Col>
              <Col>
                <FormItem
                  label="deviceName"
                  required={false}
                  labelAlign="inset"
                  {...insetLayout}
                >
                  <Input
                    placeholder="请输入"
                    value={this.state.deviceName}
                    onChange={value => this.onInput('deviceName', value)}
                  />
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="开关">
            <Switch onChange={this.onChange} checked={this.state.switch} />
          </FormItem>
          <FormItem label="调色">
            <div style={{ padding: '7px 0 0 10px' }}>
              <HuePicker
                onChangeComplete={this.onColorChange}
                color={this.state.color}
              />
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        Red: parseInt(result[1], 16),
        Green: parseInt(result[2], 16),
        Blue: parseInt(result[3], 16)
      }
    : null;
}