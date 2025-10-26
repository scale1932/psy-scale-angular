import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  code: number;
  data: {
    userId: number;
    accessToken: string;
    refreshToken: string;
    expiresTime: number;
  };
  msg: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzCheckboxModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private message = inject(NzMessageService);
  
  validateForm!: FormGroup;
  isloading = false;
  enableCaptcha = environment.features.enableCaptcha;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      captcha: [null],
      remember: [true]
    });
    
    // 如果启用了验证码，则添加验证规则
    if (this.enableCaptcha) {
      this.validateForm.get('captcha')?.setValidators([Validators.required]);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isloading = true;
      
      // 模拟登录请求，实际项目中应调用真实的API
      const credentials = {
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password
      };
      
      // 模拟API响应
      const mockResponse: LoginResponse = {
        code: 0,
        data: {
          userId: 1,
          accessToken: '24ca93c5a7d14453bc36902a8019fa87',
          refreshToken: '004ad681d340477eb01736bdab2e69dd',
          expiresTime: Date.now() + 3600000 // 1小时后过期
        },
        msg: ''
      };
      
      // 模拟网络延迟
      setTimeout(() => {
        this.isloading = false;
        
        if (mockResponse.code === 0) {
          // 存储认证信息
          this.authService.storeTokens(
            mockResponse.data.accessToken, 
            mockResponse.data.refreshToken
          );
          
          // 显示成功消息
          this.message.success('登录成功');
          
          // 导航到主页
          this.router.navigate(['/home']);
        } else {
          this.message.error('登录失败：' + mockResponse.msg);
        }
      }, 1000);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}