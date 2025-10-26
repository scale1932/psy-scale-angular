# PsyScaleAngular 项目概览 (IFLOW 上下文)

## 项目概述

这是一个使用 Angular CLI 20.3.7 创建的 Angular 项目，名为 PsyScaleAngular。该项目集成了 NG-Zorro (Ant Design 的 Angular 实现) 和 NGXS (状态管理库)。

项目结构遵循标准的 Angular CLI 生成的应用程序布局，并采用现代化的 Angular 应用架构。

### 主要技术栈

*   **框架**: Angular 20.3.7
*   **UI 库**: ng-zorro-antd 20.3.1
*   **状态管理**: @ngxs/store 20.1.0 及相关插件
*   **语言**: TypeScript 5.9.2
*   **构建工具**: Angular CLI 20.3.7
*   **测试**: 
    *   单元测试: Jasmine 5.9.0, Karma 6.4.0
    *   端到端测试: Playwright 1.56.1

## 项目结构

```
psy-scale-angular/
├── angular.json          # Angular CLI 配置文件
├── package.json          # 项目依赖和脚本
├── README.md             # 项目说明
├── tsconfig.json         # TypeScript 配置
├── tsconfig.app.json     # 应用 TypeScript 配置
├── tsconfig.spec.json    # 测试 TypeScript 配置
├── playwright.config.ts  # Playwright 端到端测试配置
├── .editorconfig         # 编辑器配置
├── .gitignore            # Git 忽略文件
├── public/               # 静态资源目录
├── src/                  # 源代码目录
│   ├── app/              # 应用代码
│   │   ├── app.config.ts # 应用配置 (提供者)
│   │   ├── app.routes.ts # 路由定义
│   │   ├── auth/         # 认证相关模块
│   │   ├── layout/       # 布局组件 (页头、页脚)
│   │   ├── pages/        # 页面组件
│   │   ├── services/     # 全局服务
│   │   └── ...           # 其他应用相关文件
│   ├── environments/     # 环境配置文件
│   ├── tests/            # 测试文件目录
│   ├── index.html        # 主页面
│   ├── main.ts           # 应用入口点
│   └── styles.css        # 全局样式
├── e2e/                  # 端到端测试文件
├── dist/                 # 构建输出目录
└── ...
```

## 构建和运行

项目使用 Angular CLI 进行构建和运行。

### 开发服务器

*   **默认开发服务器**: `npm start` 或 `ng serve --port 22222`
    *   启动开发服务器并监听 22222 端口。
    *   应用将在 `http://localhost:22222/` 可访问。
    *   文件更改时会自动重新加载。

*   **Mock 环境服务器**: `npm run start:mock`
    *   使用 `src/environments/environment.mock.ts` 配置启动服务器。
    *   通常用于前端开发时模拟后端 API。

*   **生产环境服务器**: `npm run start:prod`
    *   使用 `src/environments/environment.prod.ts` 配置启动服务器。

### 构建

*   **构建项目**: `npm run build` 或 `ng build`
    *   编译项目并将构建产物存储在 `dist/` 目录。
    *   默认使用生产配置 (`--configuration production`)，会进行优化。

*   **开发构建 (监听模式)**: `npm run watch`
    *   使用开发配置 (`--configuration development`) 构建，并在文件更改时重新构建。

### 代码生成

*   **生成组件/服务等**: `ng generate component component-name` (或 `ng g component component-name`)
    *   利用 Angular CLI 的强大脚手架工具快速生成代码。

### 测试

*   **运行单元测试**: `npm test` 或 `ng test`
    *   使用 Karma 测试运行器执行单元测试。

*   **运行单元测试并生成覆盖率报告**: `npm run test:coverage`
    *   执行测试并生成代码覆盖率报告。

*   **运行端到端测试**: `npm run test:e2e`
    *   使用 Playwright 执行端到端测试。

*   **查看端到端测试报告**: `npm run test:e2e:report`
    *   查看 Playwright 测试报告。

## 开发约定

### 认证和权限

*   项目使用 NGXS 管理认证状态 (`AuthState`)。
*   `AuthService` 负责处理登录、登出、token 刷新等逻辑。
*   `AuthGuard` 用于保护需要认证的路由。
*   `TokenInterceptor` 拦截 HTTP 请求，自动添加认证 token。
*   环境配置文件 (`environment.ts`, `environment.mock.ts`, `environment.prod.ts`) 控制认证相关参数和功能开关。

### 国际化 (i18n)

*   项目集成了 `ng-zorro-antd` 的 i18n 支持，默认使用英文 (`en_US`)。

### 样式

*   使用 `ng-zorro-antd` 的全局样式文件 `ng-zorro-antd.min.css`。
*   项目全局样式定义在 `src/styles.css`。
*   组件局部样式通常定义在组件同名的 `.css` 文件中。

### 状态管理 (NGXS)

*   使用 `@ngxs/store` 进行全局状态管理。
*   状态定义在 `src/app/*/store/*/` 目录下，例如 `AuthState`。
*   动作 (Actions) 定义在 `src/app/*/store/*/auth.actions.ts` 等文件中。
*   项目启用了 NGXS 的多个插件，如 DevTools、Logger、Form、Router 插件。

### 环境配置

*   通过 `src/environments/` 目录下的不同文件管理不同环境的配置：
    *   `environment.ts` - 开发环境配置
    *   `environment.mock.ts` - Mock环境配置
    *   `environment.prod.ts` - 生产环境配置
*   构建时通过 `--configuration` 参数选择对应的环境文件进行替换。

### 代码规范

*   项目配置了 Prettier (`prettier` 字段 in `package.json`) 用于代码格式化，设置为 100 字符宽度和单引号。
*   HTML 文件使用 Angular 解析器。

### 测试策略

*   **单元测试**: 使用 Jasmine 和 Karma，测试文件位于 `src/tests/` 目录
*   **端到端测试**: 使用 Playwright，测试文件位于 `e2e/` 目录
*   **测试运行**: 通过 npm 脚本执行各种测试任务