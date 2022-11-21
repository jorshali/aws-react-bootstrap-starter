import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useLogin } from '../../hooks/useLogin';
import { useStores } from '../../hooks/useStores';
import { useUtility } from '../../hooks/useUtility';
import { LoginButton } from './LoginButton.component';
import { LoginLinkButton } from './LoginLinkButton.component';
import { PasswordChallenge } from './PasswordChallenge.component';
import { PasswordInput } from './PasswordInput.component';

const Login: React.FC<{}> = observer(() => {
  const { authenticationStore, asyncStore } = useStores();
  const { onEnterKey } = useUtility();

  const [ errorMessage, setErrorMessage ] = useState<string>();
  const { authenticate, completeNewPasswordChallenge, completeForgotPasswordChallenge, forgotPassword } = useLogin();

  const loginDetail = authenticationStore.loginDetail;

  const handleLogin = async () => {
    setErrorMessage('');

    asyncStore.showLoading(async () => {
      try {
        await authenticate(loginDetail);
        
        if (!authenticationStore.newPasswordChallenge) {
          authenticationStore.authenticationComplete();
        }
      } catch (e) {
        setErrorMessage('The username or password is incorrect.');
      }
    });
  };

  const handleContinueChangePassword = async () => {
    setErrorMessage('');

    asyncStore.showLoading(async () => {
      try {
        if (authenticationStore.forgotPassword) {
          await completeForgotPasswordChallenge(loginDetail.username, loginDetail.newPassword, loginDetail.forgotPasswordCode);
          authenticationStore.resetAuthentication();
        } else {
          await completeNewPasswordChallenge(loginDetail.newPassword);
          authenticationStore.authenticationComplete();
        }
      } catch (e) {
        setErrorMessage('Something went wrong.  Check your verification code.');
      }
    });
  };

  const handleContinueForgotPassword = async () => {
    setErrorMessage('');

    asyncStore.showLoading(async () => {
      try {
        await forgotPassword(loginDetail.username);
        authenticationStore.setNewPasswordChallenge(true);
      } catch (e) {
        setErrorMessage('Something went wrong.  Please try again.');
        authenticationStore.resetAuthentication();
      }
    });
  };

  const handleForgotPassword = async () => {
    setErrorMessage('');
    authenticationStore.setForgotPassword(true);
  }

  const handleCancel = () => {
    authenticationStore.resetAuthentication();
    setErrorMessage('');
  }

  const renderInstructionalText = (text: string) => {
    return (
      <p className="login-instructional-text">
        {text}
      </p>
    );
  };

  const renderUsernameInput = (onEnter?: () => void) => {
    return (
      <Form.Group className="login-input">
        <Form.Control 
          type="text" 
          placeholder="Enter email address" 
          value={loginDetail.username}
          onChange={(e) => loginDetail.setUsername(e.target.value)}
          onKeyUp={onEnter ? (e) => onEnterKey(e, onEnter) : undefined}
        />
      </Form.Group>
    );
  };

  const renderLogin = () => {
    return (
      <>
        {renderUsernameInput()}

        <PasswordInput
          placeholder="Enter password"
          value={loginDetail.password}
          setValue={(value) => loginDetail.setPassword(value)}
          onEnter={handleLogin}
        />

        <LoginButton
          title="LOGIN"
          enabled={loginDetail.isUsernameComplete()}
          onClick={handleLogin}
        />

        <LoginLinkButton
          title="Forgot Password"
          onClick={handleForgotPassword}
        />
      </>
    );
  };
  
  const renderForgotPassword = () => {
    return (
      <>
        {renderInstructionalText('Let\'s create a new password.')}
        {renderUsernameInput(handleContinueForgotPassword)}

        <LoginButton
          title="CONTINUE"
          enabled={loginDetail.isUsernameComplete()}
          onClick={handleContinueForgotPassword}
        />
        
        <LoginLinkButton
          title="Back to Login"
          onClick={handleCancel}
        />
      </>
    );
  };

  const renderLoginForm = () => {
    if (authenticationStore.newPasswordChallenge) {
      return (
        <PasswordChallenge
          loginDetail={loginDetail}
          forgotPassword={authenticationStore.forgotPassword}
          onCancel={handleCancel}
          onChangePassword={handleContinueChangePassword}
        />
      )
    }

    if (authenticationStore.forgotPassword) {
      return renderForgotPassword();
    }

    return renderLogin();
  };

  const renderErrorMessage = () => {
    return (
      <div className="login-error-message-container">
        <p>{errorMessage}</p>
      </div>
    );
  };

  if (!authenticationStore.loaded) {
    return null;
  }

  return (
    <div id="login-container">
      <Container>
        <div className="login-logo-container">
          <img alt="focus.dev" src={ require('../../welcome_logo.png') } />
        </div>
        <div className="login-content-container">
          {errorMessage ? renderErrorMessage() : null}
          {renderLoginForm()}
        </div>
      </Container>
    </div>
  );
});

export { Login };