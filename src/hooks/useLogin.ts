import * as AWSCognito from 'amazon-cognito-identity-js';

import { useStores } from './useStores';
import { User } from '../models/User';
import { LoginDetail } from '../models/LoginDetail';
import { EnvConfig } from '../utility/EnvConfig';


export const useLogin = () => {
  const { authenticationStore } = useStores();

  const poolData = {
    UserPoolId: EnvConfig.get('awsUserPoolId'),
    ClientId: EnvConfig.get('awsClientId')
  };

  const userPool = new AWSCognito.CognitoUserPool(poolData);

  const authenticate = async (loginDetail: LoginDetail): Promise<AWSCognito.CognitoAccessToken> => {
    return new Promise((resolve, reject) => {
      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: loginDetail.username,
        Password: loginDetail.password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: loginDetail.username,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolve(result.getAccessToken());
        },
        onFailure: err => {
          console.log(err);

          if (err.code === 'PasswordResetRequiredException') {
            let noToken = new AWSCognito.CognitoAccessToken({ AccessToken: '' });

            authenticationStore.setNewPasswordChallenge(true);
            authenticationStore.cognitoUser = cognitoUser;

            resolve(noToken);
          } else {
            reject(err);
          }
        },
        newPasswordRequired: userAttributes => {
          let noToken = new AWSCognito.CognitoAccessToken({ AccessToken: '' });

          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          authenticationStore.setNewPasswordChallenge(true);
          authenticationStore.cognitoUser = cognitoUser;

          resolve(noToken);
        }
      });
    });
  };

  const getCurrentUser = () => {
    return userPool.getCurrentUser();
  };

  const completeNewPasswordChallenge = async (newPassword: string) => {
    const cognitoUser = authenticationStore.cognitoUser;

    return new Promise<AWSCognito.CognitoAccessToken>((resolve, reject) => {
      cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: (result) => {
          authenticationStore.setNewPasswordChallenge(false);
          resolve(result.getAccessToken());
        },
        onFailure: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
  };

  const completeForgotPasswordChallenge = async (username: string, newPassword: string, verificationCode: string) => {
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: username,
      Pool: userPool
    });

    return new Promise<string>((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: (success) => {
          authenticationStore.setNewPasswordChallenge(false);
          resolve(success);
        },
        onFailure: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
  };


  const logout = () => {
    const currentUser = getCurrentUser();

    return new Promise<void>((resolve) => {
      currentUser?.signOut(() => {
        authenticationStore.resetAuthentication();
        resolve();
      });
    })
  };

  const forgotPassword = (username: string) => {
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: username,
      Pool: userPool
    });

    return new Promise<any>((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  const getLoggedUser = (): Promise<User> => {
    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (cognitoUser != null) {
        cognitoUser.getSession((err: any, session: AWSCognito.CognitoUserSession) => {
          if (session && session.isValid()) {
            resolve(new User(session.getAccessToken()));
          } else {
            authenticationStore.resetAuthentication();
            resolve(null as any);
          }
        });
      } else {
        authenticationStore.resetAuthentication();
        resolve(null as any);
      }
    });
  }

  return {
    authenticate, getLoggedUser, completeNewPasswordChallenge, forgotPassword, completeForgotPasswordChallenge, logout
  };
}