import { makeAutoObservable } from "mobx";

export class LoginDetail {
  username: string = '';
  password: string = '';
  newPassword: string = '';
  confirmedPassword: string = '';
  forgotPasswordCode: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  static emptyInstance() {
    return new LoginDetail();
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setNewPassword(password: string) {
    this.newPassword = password;
  }

  setConfirmedPassword(password: string) {
    this.confirmedPassword = password;
  }

  setForgotPasswordCode(code: string) {
    this.forgotPasswordCode = code;
  }

  isUsernameComplete() {
    return this.username.includes('@');
  }

  isForgotPasswordCodeComplete() {
    return this.forgotPasswordCode.length >= 6;
  }
}