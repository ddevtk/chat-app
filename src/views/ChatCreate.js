import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Base from '../layouts/Base';
import {
  createChatAction,
  refreshChatCreateState,
} from '../redux/actions/chatAction';
import { Navigate, useNavigate } from 'react-router-dom';
import { joinChat } from '../api/chatsApi';
import firebase from 'firebase/app';
import 'firebase/storage';

const ChatCreate = () => {
  const { user } = useSelector((state) => state.auth);
  const { isCreating } = useSelector((state) => state.chats);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageStorage, setImageStorage] = useState(null);

  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(async () => {
    dispatch(refreshChatCreateState());
    if (image === null) return;
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    await imageRef.put(image);
    setImageStorage(`images/${image.name}`);
    setImageUrl(await imageRef.getDownloadURL());
  }, [image]);

  const onSubmit = async (data) => {
    delete data.image;
    dispatch(createChatAction({ ...data, imageUrl, imageStorage }, user.uid));
  };
  if (isCreating === false) {
    navigate('/home');
  }

  if (!user) {
    return <Navigate to='/' />;
  }

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
              {errors.name && (
                <small style={{ color: '#bf1650' }}>
                  This field is required
                </small>
              )}
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
              {errors.description && (
                <small style={{ color: '#bf1650' }}>
                  This field is required
                </small>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image</label>
              <input
                type='file'
                className='form-control'
                id='image'
                style={{
                  padding: '0',
                  backgroundColor: '#f4f4f4',
                  border: 'none',
                }}
                accept='image/*'
                {...register('image', { required: true })}
                onChange={changeImageHandler}
              />
              {errors.image && (
                <small style={{ color: '#bf1650' }}>
                  This field is required
                </small>
              )}
              {imageUrl !== null && (
                <img
                  className='img-thumbnail'
                  style={{ maxHeight: '30vh' }}
                  src={imageUrl}
                />
              )}
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
