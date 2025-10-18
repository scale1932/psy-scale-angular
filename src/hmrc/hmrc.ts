import { Component, signal, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// 注意：在实际项目中，您需要将此URL配置到环境变量中
const BACKEND_BASE_URL = 'http://localhost:8080';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div class="w-full max-w-xl bg-white shadow-xl rounded-xl p-8 space-y-8">
        <h1 class="text-3xl font-extrabold text-center text-indigo-700">HMRC 授权演示应用</h1>

        <!-- 路由内容区 -->
        <div class="min-h-[200px] flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg bg-gray-50">

          @switch (currentPath()) {
            @case ('/') {
              <div class="space-y-4 text-center">
                <p class="text-lg text-gray-600">请点击按钮，启动与 HMRC 的 OAuth2 授权流程。</p>
                <button
                  (click)="startHMRCAuth()"
                  [disabled]="isStarting()"
                  class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
                >
                  @if (isStarting()) {
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    正在跳转...
                  } @else {
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4h2a3 3 0 003-3v-5a3 3 0 00-3-3h-2"></path></svg>
                    登录并授权 HMRC
                  }
                </button>
              </div>
            }
            @case ('/auth/success') {
              <div class="text-center text-green-600">
                <svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 class="text-2xl font-bold mt-2">授权成功！</h2>
                <p class="mt-1 text-gray-700">Spring Boot 后端已安全地获取并存储了 Access Token。</p>
                <p class="mt-4 text-sm text-indigo-500">（您现在可以开始调用 HMRC 的受保护 API。）</p>
                <button (click)="goToHome()" class="mt-6 text-sm text-indigo-600 hover:underline">返回主页</button>
              </div>
            }
            @case ('/auth/failure') {
              <div class="text-center text-red-600">
                <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h2 class="text-2xl font-bold mt-2">授权失败</h2>
                <p class="mt-1 text-gray-700">HMRC 授权流程未能完成。请重试。</p>
                <button (click)="goToHome()" class="mt-6 text-sm text-indigo-600 hover:underline">返回主页</button>
              </div>
            }
            @default {
              <p class="text-lg text-gray-500">页面加载中...</p>
            }
          }
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
          <p>当前后端地址：{{ BACKEND_BASE_URL }}</p>
          <p>当前前端路径：{{ currentPath() }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Using standard CSS for inter font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    :host {
      font-family: 'Inter', sans-serif;
    }
  `]
})
export class App implements OnInit {
  // 当前 URL 路径，用于简单路由
  currentPath = signal('');
  // 状态信号，用于控制按钮的加载状态
  isStarting = signal(false);

  constructor() {
    this.currentPath.set(window.location.pathname);
  }

  ngOnInit(): void {
    // 监听 URL 变化（如果需要更复杂的路由，应使用 Angular Router）
    window.addEventListener('popstate', () => {
      this.currentPath.set(window.location.pathname);
    });
  }

  /**
   * 接口 1 交互：调用后端 /api/hmrc/auth/start 接口，并执行浏览器跳转。
   */
  async startHMRCAuth() {
    this.isStarting.set(true);
    const startUrl = `${BACKEND_BASE_URL}/api/hmrc/auth/start`;

    console.log(`1. Angular 调用后端接口: ${startUrl}`);

    try {
      // 1. 调用后端接口获取重定向 URL
      const response = await fetch(startUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Backend request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const relativeRedirectUrl = data.redirectUrl; // 例如: /oauth2/authorization/user

      if (!relativeRedirectUrl) {
        throw new Error('Backend did not provide a redirectUrl.');
      }

      // 2. 构造完整的跳转 URL
      const fullAuthUrl = BACKEND_BASE_URL + relativeRedirectUrl;

      console.log(`2. 后端返回跳转路径: ${relativeRedirectUrl}`);
      console.log(`3. Angular 执行浏览器跳转至: ${fullAuthUrl}`);

      // 3. **核心步骤：使用 window.location.href 触发浏览器导航**
      //    这解决了 AJAX 调用中的 CORS 问题，由浏览器接管跳转到 HMRC
      window.location.href = fullAuthUrl;

    } catch (error) {
      this.isStarting.set(false);
      console.error('HMRC 授权流程启动失败:', error);
      // 在实际应用中，显示一个用户友好的错误消息
      alert('无法启动授权流程，请检查后端服务是否运行。');
    }
  }

  goToHome() {
    window.history.pushState({}, '', '/');
    this.currentPath.set('/');
  }
}
