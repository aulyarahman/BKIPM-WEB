import {
  InputProps,
  Input,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FC } from "react";
import { PencilIcons } from "./icons";

export const Inputs: FC<InputProps> = (props: InputProps) => {
  return (
    <Input
      value={props.value}
      bg="white"
      onChange={props.onChange}
      {...props}
    />
  );
};

export interface InputsProps extends InputProps {
  label: string;
}

export const InputLabel: FC<InputsProps> = (props: InputsProps) => {
  return (
    <div>
      <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
        {props.label}
      </Text>
      <InputGroup>
        <Input
          value={props.value}
          bg="white"
          size="md"
          onChange={props.onChange}
          {...props}
        />
        <InputRightElement children={<PencilIcons />} />
      </InputGroup>
      {/* <Input
      
      /> */}
    </div>
  );
};
