// environment.mock.ts
export const environment = {
  production: false,
  environmentName: 'mock',

  // API 配置 - 使用 JSON Server 或 Mock Service Worker
  api: {
    baseUrl: 'http://localhost:3000/api',
    authUrl: 'http://localhost:3000/api/auth',
    userUrl: 'http://localhost:3000/api/users',
    timeout: 1000 // 快速响应，便于测试
  },

  // 认证配置
  auth: {
    tokenKey: 'access_token_mock',
    refreshTokenKey: 'refresh_token_mock',
    tokenExpirationKey: 'token_expiration_mock',
    tokenRefreshThreshold: 300,
    enableAutoRefresh: false, // Mock 环境关闭自动刷新
    mockUsers: [
      {
        username: 'admin',
        password: 'admin123',
        token: 'mock_admin_token',
        roles: ['admin'],
        permissions: ['user.read', 'user.write', 'admin.access']
      },
      {
        username: 'user',
        password: 'user123',
        token: 'mock_user_token',
        roles: ['user'],
        permissions: ['user.read']
      }
    ]
  },

  // 功能开关
  features: {
    enableMock: true,
    enableLogger: true,
    enableAnalytics: false,
    enableDebugTools: true,
    useMockData: true, // 强制使用模拟数据
    mockDelay: 500, // 模拟网络延迟
    enableCaptcha: false  // Mock 环境关闭验证码功能
  },

  // 日志配置
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemoteLogging: false,
    logMockCalls: true
  },

  // 外部服务配置
  externalServices: {
    analyticsId: '',
    sentryDsn: '',
    recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },

  // 应用配置
  app: {
    version: '1.0.0-mock',
    supportEmail: 'support@mock.example.com',
    pageSize: 10
  }
};
