import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input } from 'antd';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#__next');

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }

  > div:nth-child(2) {
    flex-grow: 5;

    > div {
      margin: 5px 0;

      > span {
        margin-right: 5px;
      }
    }
  }

  > flex {
    flex-grow: 1;
  }
`;

interface Props {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ReplyModal({ modalIsOpen, setIsOpen }: Props) {
  const customStyles = useMemo(
    () => ({
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '50%',
      },
    }),
    [],
  );
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
      <DivWrapper>
        <div>
          <div>댓글</div>
          <CloseOutlined onClick={closeModal} />
        </div>
        <div>
          <div>
            <span>
              <Avatar size={40}>USER</Avatar>
            </span>
            <span>이름</span>
            <span>미완성 댓글입니다.</span>
          </div>
        </div>
        <form>
          <Input size="large" placeholder="미완성 댓글" prefix={<UserOutlined />} />
          <Button type="primary" style={{ float: 'right' }}>
            확인
          </Button>
        </form>
      </DivWrapper>
    </Modal>
  );
}
export default ReplyModal;
