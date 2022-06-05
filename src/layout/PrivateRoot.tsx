import { Box, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { getAuth } from "firebase/auth";
import { FC, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  components: ReactNode;
} & RouteProps;

const PrivateRoutes: FC<ProtectedRouteProps> = ({ components }) => {
  const [user, loading, error] = useAuthState(getAuth());

  if (error) return <Text>{error.message}</Text>;
  if (loading)
    return (
      <Spinner thickness="4px" speed="1s" emptyColor="gray.200" size="xl" />
    );

  return <>{user ? <>{components}</> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
