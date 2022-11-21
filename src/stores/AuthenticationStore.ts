import { makeAutoObservable } from 'mobx';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { LoginDetail } from '../models/LoginDetail';

export class AuthenticationStore {
  authenticated: boolean = false;
  loginDetail: LoginDetail = LoginDetail.emptyInstance();
  cognitoUser: AWSCognito.CognitoUser;
  newPasswordChallenge: boolean = false;
  forgotPassword: boolean = false;
  loaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = () => {
    return this.authenticated;
  }

  loadComplete() {
    this.loaded = true;
  }

  setForgotPassword = (forgotPassword: boolean) => {
    this.forgotPassword = forgotPassword;
  }

  setNewPasswordChallenge = (newPasswordChallenge: boolean) => {
    this.newPasswordChallenge = newPasswordChallenge;
  }

  authenticationComplete() {
    this.authenticated = true;
    this.loginDetail = LoginDetail.emptyInstance();
  }

  resetLoginDetails = () => {
    this.loginDetail = LoginDetail.emptyInstance();
  }

  resetAuthentication = () => {
    this.authenticated = false;
    this.newPasswordChallenge = false;
    this.forgotPassword = false;
    this.resetLoginDetails();
  }
}