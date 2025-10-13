// environment.prod.ts
export const environment = {
  production: true,
  environmentName: 'production',

  // API 配置
  api: {
    baseUrl: 'https://api.example.com/api',
    authUrl: 'https://api.example.com/api/auth',
    userUrl: 'https://api.example.com/api/users',
    timeout: 10000
  },

  // 认证配置
  auth: {
    tokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    tokenExpirationKey: 'token_expiration',
    tokenRefreshThreshold: 300,
    enableAutoRefresh: true,
    secureCookie: true // 生产环境使用安全Cookie
  },

  // 功能开关
  features: {
    enableMock: false,
    enableLogger: false,
    enableAnalytics: true,
    enableDebugTools: false,
    enablePerformanceMonitoring: true,
    enableErrorTracking: true
  },

  // 日志配置
  logging: {
    level: 'error',
    enableConsole: false,
    enableRemoteLogging: true,
    remoteLoggingUrl: 'https://logs.example.com/api/logs'
  },

  // 外部服务配置
  externalServices: {
    analyticsId: 'UA-PROD-123456',
    sentryDsn: 'https://sentry.example.com',
    recaptchaSiteKey: '6LdJkX8UAAAAANkOw8vHdNTeR0a0xH3u3d9VQ7qW' // 生产环境的真实key
  },

  // 应用配置
  app: {
    version: '1.0.0',
    supportEmail: 'support@example.com',
    pageSize: 20,
    enableServiceWorker: true
  }
};
