import { PropsWithChildren } from 'react';
import { Col } from 'antd';
import NavBar from '../NavBar';
import { RowWrapper } from './styles';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <RowWrapper>
        <Col xs={0} md={6} xl={4}>
          <NavBar />
        </Col>
        <Col xs={24} md={18} xl={16}>
          {children}
        </Col>
        <Col xs={0} md={0} xl={4} />
      </RowWrapper>
    </>
  );
}

export default Layout;
