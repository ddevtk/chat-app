import React, { useState } from 'react';
import VideoThumbnail from 'react-video-thumbnail';
import { createTimestamp } from '../helpers/helpers';
import { FileImageOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Input, Badge, Image, Tooltip } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const { TextArea } = Input;

const Messenger = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [isSendFile, setIsSendFile] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const imageRef = useRef();
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };
  // console.log(value);

  const sendMessage = async () => {
    let fileUrl = '';
    console.log(fileUrl);
    if (isSendFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`files/${file.name}`);
      await fileRef.put(file);
      fileUrl = await fileRef.getDownloadURL();
    }
    if (text.trim() === '' && !isSendFile) {
      return;
    }
    let message = {
      content: { text, fileUrl },
      timestamp: createTimestamp(),
    };
    console.log(message);
    if (message.content.text === '') {
      message = {
        content: isVideo
          ? process.env.IS_VIDEO.concat(fileUrl)
          : process.env.IS_IMAGE.concat(fileUrl),
        timestamp: createTimestamp(),
      };
      setText('');
      onSubmit(message);
    }
    if (message.content.fileUrl === '') {
      message = {
        content: text,
        timestamp: createTimestamp(),
      };
      onSubmit(message);
    }
    if (message.content.fileUrl && message.content.text) {
      const message1 = {
        content: text,
        timestamp: createTimestamp(),
      };
      onSubmit(message1);
      const message2 = {
        content: isVideo
          ? process.env.IS_VIDEO.concat(fileUrl)
          : process.env.IS_IMAGE.concat(fileUrl),
        timestamp: createTimestamp(),
      };
      console.log(message2);
      onSubmit(message2);
      setText('');
    }
    setPreviewImage(null);
    setPreviewVideo(null);
    setText('');
    setIsSendFile(false);
  };

  const uploadImageOrVideo = () => {
    imageRef.current.value = '';
    imageRef.current.click();
  };

  const changeImageHandler = (e) => {
    const imageOrVideo = e.target.files[0];
    if (!imageOrVideo) return;
    setFile(imageOrVideo);
    setIsSendFile(true);

    if (imageOrVideo.type.includes('image')) {
      setIsVideo(false);
      let reader = new FileReader();
      reader.onloadend = function () {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageOrVideo);
    } else {
      setIsVideo(true);
      setPreviewVideo(URL.createObjectURL(imageOrVideo));
    }
  };

  return (
    <div className='chat-input form-group mt-3 mb-0'>
      <Tooltip title='Đính kèm một ảnh hoặc video'>
        <FileImageOutlined className='mr-2' onClick={uploadImageOrVideo} />
      </Tooltip>
      <input
        type='file'
        ref={imageRef}
        className='visually-hidden'
        accept='image/*,video/*'
        onChange={(e) => changeImageHandler(e)}
      />

      {(previewImage || previewVideo) && (
        <Badge
          count={
            <CloseOutlined
              style={{
                backgroundColor: 'white',
                borderRadius: '50%',
                cursor: 'pointer',
                padding: '3px',
                fontSize: '0.8rem',
              }}
              onClick={() => {
                setPreviewImage(null);
                setPreviewVideo(null);
                setIsSendFile(false);
                imageRef.current.value = '';
              }}
            />
          }
          className='mr-2'
        >
          {previewImage && (
            <Image
              width={50}
              height={50}
              preview={false}
              src={previewImage}
              style={{ borderRadius: '0.5rem' }}
            />
          )}
          {previewVideo && (
            <>
              <VideoThumbnail videoUrl={previewVideo} width={10} className='mr-2' />
              <RightCircleOutlined
                style={{
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  fontSize: '1.2rem',
                }}
              />
            </>
          )}
        </Badge>
      )}

      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={onKeyPressHandler}
        allowClear
        placeholder='Type your message...'
      ></TextArea>
      <SendOutlined
        className='ml-2'
        style={{ cursor: 'pointer', color: '#0052cd' }}
        onClick={sendMessage}
      />
    </div>
  );
};

export default Messenger;
