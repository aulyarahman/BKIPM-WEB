import styled from "@emotion/styled";

const GridStyled = styled.div({
  display: "grid",
  grid: "150px / auto auto auto",
  gap: "10px",
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 7,
  paddingRight: 7,
});

type GridProps = {
  children?: React.ReactNode;
};

export default function Grid(props: GridProps) {
  return <GridStyled>{props.children}</GridStyled>;
}
