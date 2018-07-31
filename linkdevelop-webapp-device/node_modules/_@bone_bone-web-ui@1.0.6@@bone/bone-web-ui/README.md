> **组件开发文档请参考： [bone 组件书写规范](bone/bone-bin#1)**

[![tnpm status](http://web.npm.alibaba-inc.com/badge/v/@alife/next.svg?style=flat-square)](http://web.npm.alibaba-inc.com/package/@alife/next)
[![tnpm download](http://web.npm.alibaba-inc.com/badge/d/@alife/next.svg)](http://web.npm.alibaba-inc.com/package/@alife/next)
[![Build Status](http://cise.alibaba-inc.com/task/443254/status.svg)](http://cise.alibaba-inc.com/task/443254)

## 我们的目标

以Fusion、next的基石，实现Bone Design规范，提供高质量的React组件库，

* 国际化和无障碍的支持
* 使用起来更清晰的API
* 通过全量的单元测试保证组件质量
* 在Fusion Design的基础上可被定制
* 性能最优
* 文档完善，并且对于React开发者易于理解

## bone 大包打包方式

1. 保证 `@bone/bone-bin` 是最新版
2. 在 `src/package.json` 的 **dependencies** 里加入已经完成的组件及版本号
3. 在根目录下运行 `tnpm run sync` 即可将最新组件小包同步到本地硬盘

## 版本发布

* 确保master分支是最新版本(`很重要`，不是最新会提示版本冲突）
* `bnpm publish` 会自动提交git、发布cdn、发布tnpm.


## 组件DEMO同步说明

目前，Bone组件的DEMO已经迁移到 http://bone.alibaba-inc.com/demo DEMO的同步原理：

1. 同步 Bone 大包，`tnpm run sync`，同步完成后会自动执行文档和 demo 的编译操作，结果输出到 `compiled_docs` 目录中
2. 发布 Bone 大包，请务必使用 `tnpm run release`，该操作会同时发布 tnpm 包和 cdn 资源。
3. 组件DEMO的展示直接使用 master 分支上的 docs 目录（DEMO平台会自动拉取该仓库）
4. DEMO平台的代码会自动使用 CDN 中的 `bone` 最新版本。
5. DEMO平台每 10min 检测一次组件大包的变更情况，检测 `package.json` 文件中的版本号的变更。
6. 如果是组件文档同步完成后，但 DEMO 平台长时间（超过1个小时）没有发生变更，请联系 [景庄](https://work.alibaba-inc.com/work/u/100127) 同步到DEMO平台。

## 更新

升级bone-web-ui请先修改 `package.json`中 scripts -> update的next版本号，在执行 ‘bnpm run update’


