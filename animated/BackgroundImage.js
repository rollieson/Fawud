import styled from 'styled-components/native';

export const BackgroundImage = styled.ImageBackground.attrs(props => ({
  imageStyle: {
    width: '400%',
    height: '400%',
    transform: [
      {
        translateX: props.translateIn.inX,
      },
      {
        translateY: props.translateIn.inY,
      },
    ],
  },
}))`
  position: absolute;
  top: -100%;
  left: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;