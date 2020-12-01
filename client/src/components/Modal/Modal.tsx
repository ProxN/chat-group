import styled, { css } from 'styled-components';
import { useModalStore } from '@store/index';
import { useRef } from 'react';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(18, 15, 19, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div<BaseProps>`
  ${({ theme, width }) => css`
    background: ${theme.colors.secondary.main};
    width: ${width || 'max-content'};
    border: 1px solid ${theme.colors.borderColor};
  `};
  padding: 3.5rem 4.5rem;
  border-radius: 24px;
`;

const ModalTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights[2]};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  text-transform: uppercase;
`;

const ModalBody = styled.div`
  margin-top: 2.4rem;
`;

interface BaseProps {
  width?: string;
}

const Modal = () => {
  const { modal, closeModal } = useModalStore();

  const ContainerRef = useRef<HTMLDivElement | null>(null);

  if (!modal) return null;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.contains(ContainerRef.current)) {
      closeModal();
    }
  };

  return (
    <ModalContainer ref={ContainerRef} onClick={handleContainerClick}>
      <ModalBox width={modal.props.width}>
        {modal.props.title && <ModalTitle>{modal.props.title}</ModalTitle>}
        <ModalBody>{modal?.render}</ModalBody>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal;
