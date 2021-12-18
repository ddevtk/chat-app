import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Base from '../layouts/Base';
import { createChatAction } from '../redux/actions/chatAction';
import { useNavigate } from 'react-router-dom';
import { joinChat } from '../api/chatsApi';

const ChatCreate = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(createChatAction(data, user.uid)).then(navigate('/home'));
  };

  return (
    <Base canGoBack>
      <div className='centered-view'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='centered-container-form'
        >
          <div className='header'>Create chat now 👋👋👋</div>
          <div className='subheader'>Chat with your friend </div>
          <div className='form-container'>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                {...register('name', { required: true })}
              />
              {/* {errors.email && (
                <small style={{ color: '#bf1650' }}>
                  This field is required
                </small>
              )} */}
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                className='form-control'
                id='description'
                {...register('description', {
                  required: true,
                })}
              />
              {/* {errors.password && errors.password.type === 'required' && (
                <small style={{ color: '#bf1650' }}>
                  This field is required!
                </small>
              )} */}
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image</label>
              <input
                type='text'
                className='form-control'
                id='image'
                {...register('image', { required: true })}
              />
              {/* {errors.email && (
                <small style={{ color: '#bf1650' }}>
                  This field is required
                </small>
              )} */}
            </div>
            {false && <div className='alert alert-danger small'></div>}
            <button type='submit' className='btn btn-outline-primary'>
              Create
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default ChatCreate;
