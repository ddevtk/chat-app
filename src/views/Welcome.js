import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const text = isLogin
    ? ["Don't have an account?", 'Register']
    : ['Already registered? ', 'Login'];
  return (
    <div className='centered-view'>
      <div className='centered-container'>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <small className='form-text text-muted mt-2'>
          {text[0]}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className='btn-link ml-2'
            style={{ cursor: 'pointer' }}
          >
            {text[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
