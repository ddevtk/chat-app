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
              validate: (value) => {
                const regex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
                console.log(regex.test(value));
                return regex.test(value);
              },
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <small style={{ color: '#bf1650' }}>This field is required!</small>
          )}

          {errors.password && errors.password.type === 'validate' && (
            <small style={{ color: '#bf1650' }}>
              Password must contain at least eight characters, at least one
              number and both lower and uppercase letters and special
              characters!
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
