import React from "react";
import { Colors } from "constant";
import { Box } from "@chakra-ui/react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { NavbarProps, SidebarProps } from "types";
import { Toaster } from "react-hot-toast";

type RootProps = {
  children: React.ReactNode;
} & NavbarProps &
  SidebarProps;

const Wrap: React.FC<RootProps> = (props: RootProps) => {
  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navbar items={props.items} />
      <Sidebar activeNum={props.activeNum} />
      <Box paddingTop="6em" paddingLeft="260px">
        {props.children}
      </Box>
    </>
  );
};

export default Wrap;
