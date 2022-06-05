import styled from "@emotion/styled";

export interface ImageProps {
  width?: string;
  height?: string;
  src?: string;
  float?: string;
  borderRadius?: string;
  pt?: string;
  mt?: string;
}

const ImageStyled = styled.img<ImageProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  src: ${(props) => props.src};
  float: ${(props) => props.float};
  border-radius: ${(props) => props.borderRadius};
  padding-top: ${(props) => props.pt};
  margin-top: ${(props) => props.mt};
`;

export const Image: React.FC<ImageProps> = (props: ImageProps) => {
  return <ImageStyled {...props} />;
};
