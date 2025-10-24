# 1. 默认安装 (项目创建时已完成)
当你使用 Angular CLI 创建新项目时（例如 ng new my-app），CLI 会自动安装和配置单元测试环境，主要包含以下核心工具：

Karma: 单元测试运行器（Test Runner）。

Jasmine: 单元测试框架（用于编写测试用例）。

相关 Angular 测试工具包: @angular/core/testing 等。

浏览器启动器: karma-chrome-launcher 等。

TypeScript 配置: 相关的类型定义文件 (@types/jasmine, etc.)。

所以，对于一个全新的、标准的 Angular 项目，你在运行 npm install 之后，就已经具备了运行单元测试的能力。

# 2.2. 运行单元测试的操作
你不需要额外的安装命令，只需要执行标准的 Angular CLI 命令即可：
ng test

执行这个命令后，CLI 会：

启动 Karma 测试运行器。

启动一个配置好的浏览器（通常是 Chrome）。

在浏览器中运行所有 .spec.ts 文件中的测试。

在命令行中显示测试结果。

# 3. 需要执行额外安装命令的特殊情况
虽然默认情况下不用额外安装，但在以下几种情况下，你可能需要进行额外的 npm install 操作：

场景一：使用 Jest 代替 Karma/Jasmine
有些开发者更喜欢使用 Jest 作为测试框架，因为它通常具有更快的运行速度和更友好的开发者体验。

所需操作： 你需要卸载 Karma 相关的包，然后安装 Jest 及其配套的 Angular 适配器（例如 jest-preset-angular）。

命令示例：

Bash

npm install jest jest-preset-angular @types/jest --save-dev
# 接着需要进行配置文件的修改
⚠️ 注意： 切换到 Jest 需要进行配置文件的修改，比使用默认的 Karma 复杂得多。

场景二：需要额外的浏览器启动器
如果你的 CI/CD 环境或本地开发环境需要使用不同于 Chrome 的浏览器（例如 Firefox、IE 或 Headless 浏览器）。

所需操作： 安装对应的 Karma 启动器。

命令示例：

Bash

npm install karma-firefox-launcher --save-dev
场景三：需要额外的测试工具
如果你的项目需要模拟 HTTP 请求、数据存储等，你可能需要安装特定的 Mocking/Spying 库。

所需操作： 安装额外的测试工具库。

命令示例：

Bash

# 例如，安装一个用于增强 mock 功能的库
npm install your-favorite-mocking-library --save-dev
总结
