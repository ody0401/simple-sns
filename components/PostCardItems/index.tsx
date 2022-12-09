import shortid from 'shortid';
import Image from 'next/image';
import { Avatar } from 'antd';
import { Post, removePost } from '../../slice/post';
import { CloseOutlined, HeartOutlined, HeartTwoTone, MessageOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import ReplyModal from '../ReplyModal';
import { useAppDispatch } from '../../store/hooks';
import { DivPostHeader, DivWrapper, SliderWrapper, SpanWrapper } from './styles';

interface Props {
  post: Post;
}

function PostCardItems({ post }: Props) {
  const settings = useMemo(() => {
    return {
      arrows: false,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  }, []);

  const iconMargin = useMemo(() => ({ fontSize: '24px', marginLeft: '5px' }), []);

  const dispatch = useAppDispatch();

  const [heartIcon, setHeartIcon] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const onClickHeart = useCallback(() => {
    setHeartIcon((prev) => !prev);
  }, []);

  const onClickRemovePost = useCallback(() => {
    dispatch(removePost(post.id));
  }, [dispatch, post.id]);

  return (
    <DivWrapper key={shortid.generate()}>
      <DivPostHeader>
        <div>
          <Avatar size={40} src={post.avatar} />
          <SpanWrapper>{post.name}</SpanWrapper>
        </div>
        <div>
          <CloseOutlined style={{ fontSize: '16px', margin: '10px 5px 0 0' }} onClick={onClickRemovePost} />
        </div>
      </DivPostHeader>
      <div>
        <SliderWrapper {...settings}>
          {post.imageSrc.map((image) => {
            return (
              <div key={shortid.generate()}>
                <Image src={image} layout="responsive" alt="animals" width={630} height={600} priority />
              </div>
            );
          })}
        </SliderWrapper>
      </div>
      <div>
        {heartIcon ? (
          <HeartTwoTone style={iconMargin} twoToneColor="#eb2f96" onClick={onClickHeart} />
        ) : (
          <HeartOutlined style={iconMargin} onClick={onClickHeart} />
        )}
        <MessageOutlined style={iconMargin} onClick={openModal} />
      </div>
      <div>
        <ReplyModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </DivWrapper>
  );
}

export default PostCardItems;
