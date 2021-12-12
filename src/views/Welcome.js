import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isChecking, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const text = isLogin
    ? ["Don't have an account?", 'Register']
    : ['Already registered? ', 'Login'];

  if (user) {
    console.log(user);
    navigate('/home');
  }

  if (isChecking) {
    return <h1>Checking state...</h1>;
  }

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
