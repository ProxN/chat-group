import styled, { css } from 'styled-components';

interface FlexProps {
  align?: 'center' | 'flex-end' | 'flex-start';
  justify?:
    | 'center'
    | 'space-between'
    | 'space-evenly'
    | 'space-around'
    | 'flex-start'
    | 'flex-end';
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  height?: string;
  fullWidth?: boolean;
  margin?: string;
}

const FlexContainer = styled.div<FlexProps>`
  ${({ justify, align, height, direction, fullWidth, margin }) => css`
    align-items: ${align};
    justify-content: ${justify};
    height: ${height && height};
    flex-direction: ${direction};
    width: ${fullWidth && '100%'};
    margin: ${margin && margin};
  `};
  display: flex;
`;

const Flex: React.FC<FlexProps> = (props) => {
  return <FlexContainer {...props} />;
};

Flex.defaultProps = {
  align: 'flex-start',
  justify: 'flex-start',
  direction: 'row',
  fullWidth: false,
};

export default Flex;
