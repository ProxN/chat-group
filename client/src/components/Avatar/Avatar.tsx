import styled from 'styled-components';

const AvatarBox = styled.div`
  height: 4.2rem;
  width: 4.2rem;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

interface AvatarProps {
  url?: string;
}

const Avatar: React.FC<AvatarProps> = ({ url }) => {
  return (
    <AvatarBox>
      <img
        src='https://avatars2.githubusercontent.com/u/46717240?s=400&u=a21aa5874b1e505e78f573d653c523e115494eee&v=4'
        alt='avatar'
      />
    </AvatarBox>
  );
};

export default Avatar;
