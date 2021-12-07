import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='centered-container-form'>
      <div className='header'>Create an account</div>
      <div className='form-container'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            {...register('email', { required: true })}
          />
          <small id='emailHelp' className='form-text text-muted'></small>
          {errors.email && (
            <small style={{ color: '#bf1650' }}>This field is required</small>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            className='form-control'
            id='username'
            {...register('username', { required: true })}
          />
          {errors.username && (
            <small style={{ color: '#bf1650' }}>This field is required</small>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='avatar'>Avatar</label>
          <input
            type='text'
            className='form-control'
            id='avatar'
            {...register('avatar')}
          />
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
        {false && <div className='alert alert-danger small'>Some Error</div>}
        <button type='submit' className='btn btn-outline-primary'>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
