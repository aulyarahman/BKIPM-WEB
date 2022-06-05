import {
  Box,
  HStack,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import { FbApp } from "../../firebase/config";
import { Colors } from "constant";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Inputs } from "components/inputs";
import { useNavigate } from "react-router-dom";

interface Regist {
  id: string;
  email: string;
  password: string;
  roles: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handLogin = async () => {
    setLoading(true);
    FbApp.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        res.user?.getIdTokenResult().then((r) => {
          localStorage.setItem("roles", r.claims.roles);
        });
        setLoading(false);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    // FbApp.functions().httpsCallable("createAccount").call({});
    // if (email === "1") {
    //   navigate("/pelanggan-menunggu", { replace: true });
    //   localStorage.setItem("roles", "pelanggan");
    //   return;
    // }
    // if (email === "2") {
    //   navigate("/pelanggan-registrasi", { replace: true });
    //   localStorage.setItem("roles", "petugas_registrasi");
    //   return;
    // }
    // if (email === "3") {
    //   navigate("/lab-permohonan", { replace: true });
    //   localStorage.setItem("roles", "petugas_lab");
    //   return;
    // }
    // if (email === "4") {
    //   navigate("/penerbit-laporan", { replace: true });
    //   localStorage.setItem("roles", "penerbit_laporan");
    //   return;
    // }
    // if (email === "5") {
    //   navigate("/laporan-hasil-uji", { replace: true });
    //   localStorage.setItem("roles", "system_admin");
    //   return;
    // }
  };

  return (
    <Box
      background={Colors.BACKGROUND}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <HStack spacing={"40px"} mb={"50px"}>
        <Image
          src="/asset/logo-kementrian-kelautan.png"
          width="91px"
          height="90px"
        />
        <Image src="/asset/logo-bkipm.png" width="99px" height="86px" />
        <Image src="/asset/kan-logo.png" width="141px" height="50px" />
      </HStack>
      <Box
        width="400px"
        borderRadius="20px"
        display="flex"
        rowGap="20px"
        flexDirection="column"
        padding="50px"
        background={Colors.WHITE}
      >
        <Text fontSize={"xl"} fontWeight={700}>
          Masuk
        </Text>
        {/* Email */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />

          <Inputs
            type="text"
            placeholder="Email"
            pl={8}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        {/* Password */}
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<LockIcon color="gray.300" />}
          />
          <Inputs
            type="password"
            placeholder="Password"
            pl={8}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button
          colorScheme="blue"
          variant="solid"
          onClick={handLogin}
          isLoading={loading}
          disabled={!email}
        >
          Login
        </Button>
      </Box>

      <VStack w={"400px"} textAlign="center" mt={"70px"}>
        <Text fontWeight={"bold"}>
          Balai Besar Karantina Ikan Hasanuddin, Makassar
        </Text>
        <Text fontSize={"sm"} color="gray">
          Jl. Dakota No.24, Sudiang Raya, Kec. Biringkanaya, Kota Makassar,
          Sulawesi Selatan 90552
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
