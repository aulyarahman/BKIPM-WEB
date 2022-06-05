import styled from "@emotion/styled";
import { Colors } from "constant";
import { MouseEventHandler } from "react";
import { CheckBoxIcons, CloseIcons } from "./icons";
import {
  Button as ButtonChakra,
  ButtonProps as BtnPropsChakra,
} from "@chakra-ui/button";

interface ButtonProps {
  label?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  bg?: string;
  w?: string;
  mt?: string;
}

const ButtonStyled = styled.button<ButtonProps>(
  {
    borderRadius: "18px",
    fontSize: "14px",
    fontWeight: "normal",
    padding: "15px",
    color: Colors.WHITE,
    border: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  (props) => ({
    background: props.bg || Colors.BLUE,
    width: props.w,
    marginTop: props.mt,
  })
);

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <ButtonStyled onClick={props.onClick}>{props.label}</ButtonStyled>;
};

export const ButtonClose: React.FC<BtnPropsChakra> = (
  props: BtnPropsChakra
) => {
  const { ...rest } = props;
  return (
    <ButtonChakra
      leftIcon={<CloseIcons />}
      bg="#F4812E"
      variant="solid"
      rounded={"3xl"}
      onClick={props.onClick}
      {...rest}
    >
      Batalkan
    </ButtonChakra>
  );
};

export const ButtonSave: React.FC<BtnPropsChakra> = (props: BtnPropsChakra) => {
  const { ...rest } = props;
  return (
    <ButtonChakra
      leftIcon={<CheckBoxIcons />}
      bg={"#178DF6"}
      variant="solid"
      rounded={"3xl"}
      onClick={props.onClick}
      {...rest}
    >
      {props.children}
    </ButtonChakra>
  );
};
