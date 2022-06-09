# 医院网上预约系统 - 网页应用

## 技术栈

开发构建工具：[Vite](https://cn.vitejs.dev/)

框架：[React](https://react.docschina.org/)

语言：[TypeScript](https://www.tslang.cn/)

UI 库：[Ant Design](https://ant.design/index-cn)

网络请求库：[RTK Query](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics)

其他可能用到的库：[React Router](https://reactrouter.com/)、[Redux](http://cn.redux.js.org/)、[Lodash](https://www.lodashjs.com/)、[ahooks](https://ahooks.js.org/zh-CN/)

## 开发指南

**强烈推荐使用 VS Code 配合 ESLint、Prettier 插件进行开发，对于 TypeScript 支持最好。**

首先，请安装 [Node.js](https://nodejs.org/zh-cn/) 和 [Yarn](https://www.yarnpkg.cn/)。

克隆本项目，进入项目目录。安装依赖包：

```
yarn
```

启动开发服务器：

```
yarn dev --host
```

这时可以在 http://localhost:3000 访问网站，所有代码更改将会即时更新。

**注意：开发前请先新建分支（可以用 _自己的用户名/要开发的页面名_ 作为分支名，如 username/homepage），在新分支上开发，不要随便合并到 master 分支。**

## src 文件目录结构

- apis：统一请求封装
- assets：静态资源，会被打包优化
- components：全局组件，分业务组件或 UI 组件
- layouts：布局模板，不同的路由，可以配置不同的模板
- libs：第三方库
- pages：页面和页面级组件
- routes：路由配置
- stores：全局状态管理
- types：类型定义
- utils：工具方法
- App.tsx：应用入口
- index.css：全局样式
- main.tsx：React 入口

## 单页面开发流程（以用户信息页面为例）

1. 在 src/routes/index.tsx 中找到要写的页面的路由，用户信息页面对应的路由为 /users/:userId

2. 在 src/pages 下创建页面文件，可以先新建 users 子文件夹，在该文件夹下新建用户信息页面文件 UserInfoPage.tsx

3. 用 `import UserInfoPage from '../pages/users/UserInfoPage';` 在 src/routes/index.tsx 中引入该页面，将其添加到对应的路由中 `{ path: ':userId', element: <UserInfoPage /> },`

4. 在页面文件中编写页面代码，如果需要创建自定义组件，可以新建自定义组件文件

## git commit 规范

- 添加新功能请使用 `feat:` 开头，如 `feat: 实现登录注册`

- 修复问题请使用 `fix:` 开头，如 `fix: 修复 XX 组件样式问题`

- 文档更新请使用 `docs:` 开头

- 不影响程序逻辑的代码修改请使用 `style:` 开头

- 重构代码请使用 `refactor:` 开头
