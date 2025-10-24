// login.component.ts
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  selectedIndex = signal(0);
  loginForm: FormGroup;
  registerForm: FormGroup;
  captchaText = signal('');
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    // 初始化登录表单
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    });

    // 初始化注册表单
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.refreshCaptcha();
  }

  // 自定义验证器：检查密码是否匹配
  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'confirm': true };
    }
    return null;
  }

  // 生成随机验证码
  refreshCaptcha(): void {
    const randomArray = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let authCode = '';
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * 36);
      authCode += randomArray[index];
    }
    this.captchaText.set(authCode);
  }

  // 登录提交
  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      // 验证码校验
      const inputCaptcha = this.loginForm.get('captcha')?.value?.toUpperCase();
      if (inputCaptcha !== this.captchaText()) {
        this.message.error('验证码错误！');
        this.refreshCaptcha();
        this.isLoading.set(false);
        return;
      }

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 调用登录API
      this.message.success('登录成功！');
      console.log('登录表单值:', this.loginForm.value);
      this.isLoading.set(false);
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // 注册提交
  async onRegister(): Promise<void> {
    if (this.registerForm.valid) {
      this.isLoading.set(true);

      // 验证码校验
      const inputCaptcha = this.registerForm.get('captcha')?.value?.toUpperCase();
      if (inputCaptcha !== this.captchaText()) {
        this.message.error('验证码错误！');
        this.refreshCaptcha();
        this.isLoading.set(false);
        return;
      }

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 调用注册API
      this.message.success('注册成功！');
      console.log('注册表单值:', this.registerForm.value);

      // 注册成功后切换到登录选项卡
      this.selectedIndex.set(0);
      this.isLoading.set(false);
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
