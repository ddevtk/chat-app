import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import firebase from 'firebase/app';
import 'firebase/storage';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarStorage, setAvatarStorage] = useState(null);

  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(async () => {
    if (image === null) return;
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`users/${image.name}`);
    await imageRef.put(image);
    setAvatarStorage(`images/${image.name}`);
    setAvatarUrl(await imageRef.getDownloadURL());
  }, [image]);

  const onSubmit = (data) => {
    delete data.avatar;
    dispatch(registerUser({ ...data, avatarUrl, avatarStorage }));
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
            type='file'
            className='form-control'
            id='avatar'
            style={{
              padding: '0',
              backgroundColor: '#f4f4f4',
              border: 'none',
            }}
            accept='image/*'
            {...register('avatar', { required: true })}
            onChange={changeImageHandler}
          />
          {errors.image && (
            <small style={{ color: '#bf1650' }}>This field is required</small>
          )}
          {avatarUrl !== null && (
            <img
              className='rounded-circle z-depth-2'
              style={{ width: '100px' }}
              src={avatarUrl}
            />
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
        <div className='form-group'>
          <label htmlFor='cf-password'>Confirm password</label>
          <input
            type='password'
            className='form-control'
            id='cf-password'
            {...register('password_confirm', {
              required: 'This field is required!',
              validate: (value) => {
                return value === watch('password');
              },
            })}
          />

          {errors.password_confirm &&
            errors.password_confirm.type === 'validate' && (
              <small style={{ color: '#bf1650' }}>
                The passwords do not match
              </small>
            )}
        </div>
        {error && <div className='alert alert-danger small'>{error}</div>}
        <button type='submit' className='btn btn-outline-primary'>
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
