import React from 'react';
import { useForm } from 'react-hook-form';
import { withBaseLayout } from '../layouts/BaseLayout';
import { createChat } from '../actions/chats';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatCreate = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const uid = useSelector(({ auth }) => auth.user.uid);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(createChat(data, uid)).then((_) => {
      navigate('/home');
    });
  };

  return (
    <div className='centered-view'>
      <div className='centered-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='centered-container-form'>
          <div className='header'>Create chat now!</div>
          <div className='subheader'>Chat with people you know</div>
          <div className='form-container'>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                {...register('name', { required: false })}
                type='text'
                className='form-control'
                id='name'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                {...register('description', { required: false })}
                className='form-control'
                id='description'
              ></textarea>
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image</label>
              <input
                {...register('image', { required: false })}
                type='text'
                className='form-control'
                id='image'
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(ChatCreate, { canGoBack: true });
