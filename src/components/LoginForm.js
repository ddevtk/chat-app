import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='centered-container-form'>
      <div className='header'>Welcome here 🎉🎉🎉</div>
      <div className='subheader'>Login and chat with other people!</div>
      <div className='form-container'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            {...register('email', { required: true })}
          />
          {errors.email && (
            <small style={{ color: '#bf1650' }}>This field is required</small>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <small style={{ color: '#bf1650' }}>This field is required!</small>
          )}
        </div>
        {error && <div className='alert alert-danger small'>{error}</div>}
        <button type='submit' className='btn btn-outline-primary'>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
