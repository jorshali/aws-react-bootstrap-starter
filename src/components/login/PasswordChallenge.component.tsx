import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form } from 'react-bootstrap';
import { LoginDetail } from '../../models/LoginDetail';
import { LoginButton } from './LoginButton.component';
import { LoginLinkButton } from './LoginLinkButton.component';
import { PasswordInput } from './PasswordInput.component';

type Props = {
  loginDetail: LoginDetail;
  forgotPassword?: boolean;
  onChangePassword: () => void;
  onCancel: () => void;
};

const PasswordChallenge: React.FC<Props> = observer(({ loginDetail, forgotPassword, onChangePassword, onCancel }) => {
  const isPassword8CharactersLong = (loginDetail: LoginDetail) => {
    return loginDetail.newPassword.length >= 8;
  }

  const doesPasswordContain1Number = (loginDetail: LoginDetail) => {
    return /\d/.test(loginDetail.newPassword);
  }

  const doesPasswordContain1SpecialChar = (loginDetail: LoginDetail) => {
    return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(loginDetail.newPassword);
  }

  const doPasswordsMatch = (loginDetail: LoginDetail) => {
    return !!loginDetail.confirmedPassword && loginDetail.newPassword === loginDetail.confirmedPassword;
  }

  const validationRequirements = [
    {
      text: 'At least 8 characters long',
      validation: isPassword8CharactersLong
    },
    {
      text: 'Include 1 number',
      validation: doesPasswordContain1Number
    },
    {
      text: 'Include 1 special character',
      validation: doesPasswordContain1SpecialChar
    },
    {
      text: 'Passwords match',
      validation: doPasswordsMatch
    }
  ];

  const isPasswordValidationsComplete = () => {
    return isPassword8CharactersLong(loginDetail) &&
      doesPasswordContain1Number(loginDetail) &&
      doesPasswordContain1SpecialChar(loginDetail) &&
      doPasswordsMatch(loginDetail);
  };

  const handleContinueChangePassword = async () => {
    onChangePassword();
  };

  const handleCancel = () => {
    onCancel();
  }

  const renderInstructionalText = (text: string) => {
    return (
      <p className="login-instructional-text">
        {text}
      </p>
    );
  };

  const getColorClass = (valid: boolean) => {
    if (valid) {
      return 'valid-text';
    }

    if (!valid && loginDetail.newPassword.length > 0) {
      return 'invalid-text';
    }

    return '';
  }

  const renderPasswordValidationRequirements = () => {
    return (
      <div className="login-password-requirements">
        <div className="login-password-requirements-header">
          Password Requirements:
        </div>

        <ul>
          {
            validationRequirements.map((validationRequirement, index) => {
              return (
                <li key={`validationRequirement-${index}`}
                  className={getColorClass(validationRequirement.validation(loginDetail))}>
                  {validationRequirement.text}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  };

  const renderForgotPasswordCodeInput = () => {
    return (
      <Form.Group className="login-input">
        <Form.Control 
          type="text" 
          placeholder="Enter code"
          value={loginDetail.forgotPasswordCode}
          onChange={(e) => loginDetail.setForgotPasswordCode(e.target.value)}
        />
      </Form.Group>
    );
  };

  return (
    <>
      {
        renderInstructionalText(
          forgotPassword ?
            'Check your email for a verification code.' :
            'Password change required.'
        )
      }

      <>
        {forgotPassword ? renderForgotPasswordCodeInput() : null}
        
        <PasswordInput
          placeholder="Enter new password"
          value={loginDetail.newPassword}
          setValue={(value) => loginDetail.setNewPassword(value)}
        />

        <PasswordInput
          placeholder="Confirm new password"
          value={loginDetail.confirmedPassword}
          setValue={(value) => loginDetail.setConfirmedPassword(value)}
        />

        {renderPasswordValidationRequirements()}
        
        <LoginButton
          title="CONTINUE"
          enabled={(!forgotPassword || loginDetail.isForgotPasswordCodeComplete()) && isPasswordValidationsComplete()}
          onClick={handleContinueChangePassword}
        />

        <LoginLinkButton
          title="Back to Login"
          onClick={handleCancel}
        />
      </>
    </>
  );
});

export { PasswordChallenge };