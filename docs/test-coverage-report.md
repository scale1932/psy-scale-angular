# 测试覆盖率报告

## 概述

本项目已重新架构单元测试，所有测试文件现在都位于 `tests` 目录下，并支持生成测试覆盖率报告。

## 目录结构

```
tests/
├── app/
│   ├── auth/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── layout/
│   │   ├── footer/
│   │   └── header/
│   ├── pages/
│   │   ├── about/
│   │   ├── home/
│   │   └── error/
│   │       ├── internal-server-error/
│   │       └── not-found/
│   └── services/
```

## 运行测试

### 基本测试

```bash
npm run test
```

### 生成覆盖率报告

```bash
npm run test:coverage
```

该命令将生成覆盖率报告并输出到 `coverage/psy-scale-angular` 目录。

## 查看报告

生成的覆盖率报告位于 `coverage/psy-scale-angular/index.html`，可以用浏览器打开查看详细信息。

## 导入路径说明

由于测试文件已移至 `tests` 目录，所有导入路径已相应更新，使用相对路径指向 `src` 目录中的源文件。

例如：
```typescript
// 在 tests/app/layout/layout.spec.ts 中
import { Layout } from '../../../src/app/layout/layout';
```