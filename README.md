# All season investor FE Project

## 技术栈

* React
* NextJs
* Mobx
* Ant Design
* React Intl
* Server Render

## 目录结构

```bash
├── src                     # the code for front end
│   ├── components          # 公共组件 -- 纯静态组件 -- 业务无关
│   ├── containers          # 状态业务组件 -- 注入状态的业务组件
│   ├── module              # 静态业务组件 -- 无状态
│   ├── pages               # nextjs页面
│   │   ├── _document.js    # 自定义document
│   │   ├── antd.js         # 蚂蚁金服组件测试页
│   │   ├── clock.js        # mobx-state-tree测试页
│   │   ├── react-intl.js   # 资源国际化测试页
│   │   ├── test.js         # 测试页面首页 - 测试目录页
│   │   ├── login.js        # 登陆页面
│   │   ├── asset-detail.js # 资产详情页面
│   │   └── index.js        # 应用首页
│   ├── util                # 工具代码
│   └── stores              # 状态配置
```

## 作者

[ninemill.song](https://github.com/ninemilli-song)

## 感谢项目

[nextjs-starter-kit](https://github.com/soulmachine/nextjs-starter-kit)

[JSON Web Token Authentication in React and react-router](https://hptechblogs.com/using-json-web-token-react/)

[Add login / authentication example](https://github.com/zeit/next.js/issues/153)

