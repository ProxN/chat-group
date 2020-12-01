import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Modal from '@components/Modal';
import { useModalStore } from '@store/index';
import Sidebar from './Sidebar';

const Main = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 32.5rem 1fr;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const authPaths = ['/login', '/register', '/forgot_password'];
const Layout: React.FC = ({ children }) => {
  const { isModalOpen } = useModalStore();
  const { pathname } = useRouter();

  if (authPaths.includes(pathname) || pathname.startsWith('/reset')) return <>{children}</>;

  return (
    <Main>
      <Sidebar />
      <Wrapper>{children}</Wrapper>
      {isModalOpen && <Modal />}
    </Main>
  );
};

export default Layout;
