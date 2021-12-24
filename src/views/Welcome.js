import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingView from '../components/shared/LoadingView';
import { useDispatch } from 'react-redux';
import { cleanError } from '../redux/actions/authActions';
import { checkUserConnection } from '../redux/actions/connectionAction';

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isChecking, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const text = isLogin
    ? ["Don't have an account?", 'Register']
    : ['Already registered? ', 'Login'];

  useEffect(() => {
    if (user?.uid) {
      dispatch(checkUserConnection(user.uid, 'online'));
    }
  }, [dispatch, user]);

  if (isChecking) {
    return <LoadingView />;
  }
  if (user) {
    return <Navigate to='/home' />;
  }

  return (
    <div className='centered-view'>
      <div className='centered-container'>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <small className='form-text text-muted mt-2'>
          {text[0]}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              dispatch(cleanError());
            }}
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
