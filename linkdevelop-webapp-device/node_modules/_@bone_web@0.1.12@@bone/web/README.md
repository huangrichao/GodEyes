# bone-web-sdk
React and redux based, lightweight framework.

## 示例
### Counter
```javascript
import { createApp, Model } from "@bone/web";
import React, { Component } from "react";
import styles from "./index.css";

// 模型
class CounterModel extends Model {
    // 模型初始数据
    static initialState = {
        count: 0
    }

    add(step){
        return {
            count: this.state.count + step
        }
    }

    minus(step){
        return {
            count: this.state.count - step
        }
    }
}

// 组件
class CounterComponent extends Component {
    // 指定组件使用的模型
    static Model = CounterModel

    render(){
        return <div className={ styles.container }>
                    <h1>{ this.props.count }</h1>
                    <p>
                        <a onClick={() => this.actions.minus(2)}>-</a>
                        <a onClick={() => this.actions.add(2)}>+</a>
                    </p>
                </div>
    }
}

// 创建APP
createApp({
    router: {
        routes: [{
            page: CounterComponent
        }]
    }
})
```

### 带路由的应用
```javascript
import { createApp } from "@bone/web";
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/home";

createApp({
    // 布局组件[可选]
    layout: DefaultLayout,
    // 路由配置
    router: {
        routes: [{
            path: "/",
            page: HomePage
        }, {
            path: "/list/:city",
            // 异步路由，访问到的时候才去加载
            page: () => import("./pages/list")
        }, {
            path: "/detail/:id",
            page: () => import("./pages/detail")
        }]
    }
});
```


更多示例，请克隆本项目，在根目录和example目录分别执行 bnpm i 安装依赖，然后在example目录执行 bnpm start 启动本地服务