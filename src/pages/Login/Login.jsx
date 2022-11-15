import React, { useState } from 'react';
import '../shared.scss';
import './Login.scss';

// Import components
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

// Import images
import homeMockup from '../../assets/images/drone-home-macbook.png';
import AuthService from '../../services/auth.service';
import TokenService from '../../services/token.service';
import CustomHistory from '../../custom/CustomHistory';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const validateLogin = () => {
    if (!emailValue) {
      window.toast.warn('Please enter your e-mail address');

      return false;
    }
    if (!passwordValue) {
      window.toast.warn('Please enter your password');

      return false;
    }

    return true;
  };

  const authLogin = () => {
    if (validateLogin()) {
      AuthService.login(emailValue, passwordValue)
        .then((data) => {
          if (data) {
            TokenService.setUser(data);
          }

          // Go to the overview page and reload
          CustomHistory.replace('/');
          CustomHistory.go(0);
        })
        .catch(() => {
          window.toast.error('The combination of email address and password is not valid.');
        });
    }
  };

  return (
    <div className="login">
      <div className="left">
        <img alt="mockup" src={homeMockup} />
      </div>
      <div className="right">
        <div className="inner">
          <h3>Login</h3>
          <Input
            handleChange={(event) => {
              setEmailValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                authLogin();
              }
            }}
            value={emailValue}
            label="E-mail address"
            placeholder="E-mail address"
          />
          <Input
            handleChange={(event) => {
              setPasswordValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                authLogin();
              }
            }}
            inputType="password"
            value={passwordValue}
            label="Password"
            placeholder="Password"
          />
          <div className="button-wrapper">
            <Button onclick={authLogin}>Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
