import {Component, OnInit, inject, signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import {Store} from '@ngxs/store';
import {LoginRequest} from '../../models/auth.model';
import {LoginAuth} from '../../auth/store/auth/auth.actions';

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
  private store = inject(Store);

  isLoading = signal(true);
  validateForm!: FormGroup;
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
      const credentials: LoginRequest = {
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password
      };

      this.store.dispatch(new LoginAuth(credentials));
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
