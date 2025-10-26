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
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzGridModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private message = inject(NzMessageService);
  
  validateForm!: FormGroup;
  isloading = false;
  enableCaptcha = environment.features.enableCaptcha;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
      captcha: [null],
      agree: [false, [Validators.requiredTrue]]
    }, {
      validators: this.confirmationValidator
    });
    
    // 监听密码字段变化，更新确认密码验证
    this.validateForm.get('password')?.valueChanges.subscribe(() => {
      this.updateConfirmValidator();
    });
    
    // 如果启用了验证码，则添加验证规则
    if (this.enableCaptcha) {
      this.validateForm.get('captcha')?.setValidators([Validators.required]);
    }
  }

  confirmationValidator(group: FormGroup): void {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword!.setErrors({ confirm: true });
    } else if (confirmPassword) {
      confirmPassword.setErrors(null);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isloading = true;
      
      // 模拟注册请求
      const registrationData = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password
      };
      
      // 模拟网络延迟
      setTimeout(() => {
        this.isloading = false;
        
        // 模拟注册成功
        this.message.success('注册成功！');
        this.router.navigate(['/login']);
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

  updateConfirmValidator(): void {
    const confirmPasswordControl = this.validateForm.get('confirmPassword');
    if (confirmPasswordControl) {
      confirmPasswordControl.updateValueAndValidity();
    }
  }
}