import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
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
              minLength: 8,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <small style={{ color: '#bf1650' }}>This field is required</small>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <small style={{ color: '#bf1650' }}>
              Password must be at least 8 characters
            </small>
          )}
        </div>
        {false && <div className='alert alert-danger small'>Some error</div>}
        <button type='submit' className='btn btn-outline-primary'>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
