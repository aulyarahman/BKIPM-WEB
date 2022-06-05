import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { SidebarProps } from "types";
import { Link } from "react-router-dom";
import { Colors, Typography } from "constant";
import { SidebarNavigation } from "./sidebar_navigation";
import { Image } from "components";

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const items = SidebarNavigation();
  return (
    <Box
      background="#FFF"
      margin={0}
      padding={0}
      position="fixed"
      zIndex={2}
      overflow="auto"
      boxShadow="0.5px 0.5px 0.5px #aaaaaa"
      left={0}
      top={0}
      width="250px"
      height="100%"
    >
      <Box paddingLeft="20px" paddingTop="20px" display="flex" gap="10px">
        <Image src="/asset/logo-bkipm.png" width="54px" height="47px" />
        <Text paddingTop="10px" fontWeight="bold">
          Makassar
        </Text>
      </Box>
      {/*  */}
      <Box display="flex" flexDirection="column" marginTop="30px" rowGap="10px">
        {items?.map((v) => (
          <Link key={v.id} to={v.href} rel="noopener">
            {/*  */}
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              width="80%"
              height="52px"
              paddingLeft="10px"
              marginLeft="20px"
              borderRadius="10px"
              _hover={{
                cursor: "pointer",
                background: Colors.HOVER,
                color: Colors.BLUE,
              }}
              background={
                v.id === props.activeNum ? Colors.BLUE : "transparent"
              }
              color={v.id === props.activeNum ? Colors.WHITE : Colors.BLACK}
            >
              <Center gap={2}>
                <Text as={"span"} w={"30px"}>
                  {v.icon}
                </Text>
                <Text fontSize={Typography.FONT_SIZE} fontWeight="semibold">
                  {v.title}
                </Text>
              </Center>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
