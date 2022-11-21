import * as AWSCognito from 'amazon-cognito-identity-js';

export class User {
  constructor(private cognitoUser: AWSCognito.CognitoIdToken) {
  }

  static emptyUser() {
    return new User(undefined as any);
  }
  
  getUsername() {
    return this.cognitoUser ? this.cognitoUser.payload['cognito:username'] : '';
  }

  getJwtToken() {
    return this.cognitoUser ? this.cognitoUser.getJwtToken() : '';
  }
}