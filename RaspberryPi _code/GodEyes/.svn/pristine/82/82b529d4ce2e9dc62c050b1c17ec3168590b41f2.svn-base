# redux-dynamic
对redux进行增强，支持store创建后动态添加、移除middleware和reducer

## 示例

### 动态添加/移除middleware
```javascript
import { createStore } from "redux";
import { applyMiddleware } from "redux-dynamic";

const store = applyMiddleware(...middlewares)(createStore)(reducer);

//
store.$middleware.append(...middlewares);
//
store.$middleware.insertBefore(targetMiddleware, ...middlewares);
//
store.$middleware.insertAfter(targetMiddleware, ...mmiddlewares);
//
store.$middleware.remove(...middlewares);
```

### 动态添加/移除reducer
```javascript
import { createStore } from "redux";
import { reducerDynamic } from "redux-dynamic";

const store = reducerDynamic(createStore)(reducer);

//
store.$reducer.add(...reducers);
```