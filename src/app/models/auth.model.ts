import {BaseResponse} from './base.model';

export interface LoginResponse extends BaseResponse<LoginResponseData>{

}

export interface LogoutResponse extends BaseResponse<boolean>{

}

export interface LoginResponseData {
  userId: number;
  accessToken: string;
  refreshToken: string;
  expiresTime: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  captchaVerification?: string;
  rememberMe?: boolean;
}
