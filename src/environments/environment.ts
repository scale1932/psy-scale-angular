// environment.ts
export const environment = {
  production: false,
  environmentName: 'development',

  // API 配置
  api: {
    baseUrl: 'http://localhost:4200/api',
    authUrl: 'http://localhost:4200/api/auth',
    userUrl: 'http://localhost:4200/api/users',
    timeout: 30000
  },

  // 认证配置
  auth: {
    tokenKey: 'access_token_dev',
    refreshTokenKey: 'refresh_token_dev',
    tokenExpirationKey: 'token_expiration_dev',
    tokenRefreshThreshold: 300, // 5分钟前刷新token
    enableAutoRefresh: true
  },

  // 功能开关
  features: {
    enableMock: true,
    enableLogger: true,
    enableAnalytics: false,
    enableDebugTools: true,
    enableCaptcha: true  // 是否启用验证码功能
  },

  // 日志配置
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemoteLogging: false
  },

  // 外部服务配置
  externalServices: {
    analyticsId: '',
    sentryDsn: '',
    recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // 测试用的key
  },

  // 应用配置
  app: {
    version: '1.0.0-dev',
    supportEmail: 'support@dev.example.com',
    pageSize: 20
  }
};
