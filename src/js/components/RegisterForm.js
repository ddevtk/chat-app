import React from 'react';
import { useForm } from 'react-hook-form';
import * as action from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import LoadingView from './shared/LoadingView';

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.login.error);
  const isChecking = useSelector(({ auth }) => auth.login.isChecking);

  if (isChecking) {
    return <LoadingView />;
  }

  const onSubmit = (registerData) => {
    dispatch(action.registerUser(registerData));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='centered-container-form'>
      <div className='header'>Create an account</div>
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
          <label htmlFor='username'>Username</label>
          <input
            {...register('username', { required: false })}
            type='text'
            className='form-control'
            id='username'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='avatar'>Avatar</label>
          <input
            {...register('avatar', { required: false })}
            type='text'
            className='form-control'
            id='avatar'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            {...register('password', { required: false })}
            type='password'
            className='form-control'
            id='password'
            aria-describedby='emailHelp'
          />
        </div>
        {error && <div className='alert alert-danger small'>{error.message}</div>}
        <button type='submit' className='btn btn-outline-primary'>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
