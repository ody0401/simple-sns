import { Typography } from 'antd';
import { PlusSquareOutlined, HomeOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { animateScroll as scroll } from 'react-scroll';
import { useCallback } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addPostAPI } from '../../actions/post';
import { allRemovePost } from '../../slice/post';
import { DivFixed, DivWrapper, SpanWrapper } from './styles';

const { Title } = Typography;

function NavBar() {
  const dispatch = useAppDispatch();

  const createFaker = useCallback(async () => {
    dispatch(addPostAPI());
  }, [dispatch]);

  const onClickHome = useCallback(() => {
    scroll.scrollToTop();
  }, []);

  const onClickReset = useCallback(() => {
    dispatch(allRemovePost());
  }, [dispatch]);

  return (
    <DivFixed>
      <DivWrapper>
        <Title level={3} onClick={onClickHome}>
          <HomeOutlined />
          <SpanWrapper>홈</SpanWrapper>
        </Title>
      </DivWrapper>
      <DivWrapper>
        <Title level={3} onClick={createFaker}>
          <PlusSquareOutlined />
          <SpanWrapper>만들기</SpanWrapper>
        </Title>
      </DivWrapper>
      <DivWrapper>
        <Title level={3} onClick={onClickReset}>
          <MinusSquareOutlined />
          <SpanWrapper>초기화</SpanWrapper>
        </Title>
      </DivWrapper>
    </DivFixed>
  );
}

export default NavBar;
