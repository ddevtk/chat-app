import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ViewTitle from '../components/shared/ViewTitle';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { fetchChatsAction, joinChatAction } from '../redux/actions/chatAction';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const AvailableChats = ({ chats }) => {
  const [showModal, setShowModal] = useState(false);
  const [chatItem, setChatItem] = useState();
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(joinChatAction(chatItem.id)).then(() => {
      dispatch(fetchChatsAction()).then(() => {
        setShowModal(false);
      });
    });
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const showModalHandler = (chat) => {
    setChatItem(chat);
    setShowModal(true);
  };

  return (
    <>
      <ViewTitle text={'Choose your channel'}>
        <Link className='btn btn-outline-primary' to='/chat-create'>
          New
        </Link>
      </ViewTitle>
      <div
        className='container-fluid'
        style={{ overflowY: 'scroll', height: '75vh' }}
      >
        <div className='row mt-3'>
          {false && (
            <div className='container-fluid'>
              <div className='alert alert-warning'>No chats to join :</div>
            </div>
          )}
          {chats?.map((chat) => (
            <div className='col-lg-3 col-md-6 mb-3' key={chat.id}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{chat.name}</h5>
                  <p className='card-text'>{chat.description}</p>
                  <button
                    onClick={() => showModalHandler(chat)}
                    className='btn btn-outline-primary'
                  >
                    Join Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        centered
        visible={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span className='d-flex align-items-center'>
          <ExclamationCircleOutlined
            style={{ color: '#faad14', marginRight: '5px', fontSize: '150%' }}
          />{' '}
          Do you want to join the chat ?
        </span>
      </Modal>
    </>
  );
};

export default AvailableChats;
