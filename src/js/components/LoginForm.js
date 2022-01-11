import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LoadingView from './shared/LoadingView';
import { login } from '../actions/auth';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const error = useSelector(({ auth }) => {
    return auth.login.error;
  });

  const isChecking = useSelector(({ auth }) => auth.login.isChecking);

  if (isChecking) {
    return <LoadingView />;
  }

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='centered-container-form'>
      <div className='header'>Welcome here!</div>
      <div className='subheader'>Login and chat with other people!</div>
      <div className='form-container'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email', { required: false })}
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', { required: false })}
            type='password'
            className='form-control'
            id='password'
          />
        </div>
        {error && <div className='alert alert-danger small'>{error.message}</div>}
        <button type='submit' className='btn btn-outline-primary'>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
