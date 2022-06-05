import { SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { PapersIcons } from "./icons";
import { Inputs } from "./inputs";

interface SearchButtonProps {
  labelBtn?: string;
  show?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const SearchButton: React.FC<SearchButtonProps> = (
  props: SearchButtonProps
) => {
  return (
    <HStack pb={"20px"} pr={"10px"}>
      {!props.show ? (
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Inputs
            type="tel"
            placeholder="Search"
            pl={10}
            rounded={"3xl"}
            onChange={props.onChange}
          />
        </InputGroup>
      ) : (
        <></>
      )}
      {props.labelBtn && (
        <Button
          leftIcon={<PapersIcons fontSize={"lg"} />}
          colorScheme="blue"
          variant="solid"
          rounded={"3xl"}
          w={"180px"}
          onClick={props.onClick}
          fontSize={"sm"}
        >
          {props.labelBtn}
        </Button>
      )}
    </HStack>
  );
};

export default SearchButton;
