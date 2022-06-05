import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { Image } from "components";
import { NavbarProps } from "types";
import { Link } from "react-router-dom";
import { FbApp } from "../firebase/config";

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const handleLogout = async () => {
    FbApp.auth().signOut();
  };
  return (
    <Box
      as={"nav"}
      position={"fixed"}
      display="flex"
      background="white"
      shadow={"md"}
      width={"full"}
      height={"70px"}
      padding="3px"
      zIndex={1}
      top={0}
      left={0}
    >
      {/* BreadCrumb */}
      <Box margin={5} marginTop="14px" marginLeft="10px" paddingLeft="16em">
        <Breadcrumb>
          {props.items.map((it, id) => (
            <BreadcrumbItem key={id}>
              <BreadcrumbLink to={it.href} as={Link} fontWeight="semibold">
                {it.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>

      {/* Profile */}
      <Box
        display="flex"
        flexDirection="row"
        float="right"
        marginLeft="auto"
        paddingRight="10px"
        zIndex={10}
        marginRight={5}
      >
        {/* <Box
          display="flex"
          flexDirection="column"
          paddingRight="10px"
          paddingTop="5px"
          gap="5px"
        >
          <Text fontWeight="bold">Administrator</Text>
          <Text fontSize={"sm"}>Roles</Text>
        </Box>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          mt={"10px"}
        /> */}
        <Menu>
          <MenuButton>
            <Avatar
              src={"/dummy.jpg"}
              name={`Admin`}
              width="50px"
              height="50px"
            />
          </MenuButton>

          <MenuList p="2" mt={"-50px"} ml="-150px" zIndex={100}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
