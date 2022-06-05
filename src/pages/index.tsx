import { FbApp } from "../firebase/config";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenTypes } from "types";
import { Spinner } from "@chakra-ui/react";

const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        return FbApp.auth().onIdTokenChanged(async (user) => {
          if (!user) {
            return;
          }
          const claims = await user.getIdTokenResult();
          const resToken = claims.claims as TokenTypes;

          const regex = resToken.user_id.split("-")[0];

          if (resToken.roles === "sysadmin") {
            navigate("/laporan-hasil-uji", { replace: true });
            return;
          }

          if (regex === "SYSADMIN") {
            navigate("/laporan-hasil-uji", { replace: true });
            return;
          }

          if (regex === "PELANGGAN") {
            navigate("/pelanggan-menunggu", { replace: true });
            return;
          }

          if (regex === "PETUGAS_REGISTRASI") {
            navigate("/pelanggan-registrasi", { replace: true });
            return;
          }
          if (regex === "PETUGAS_LAB") {
            navigate("/lab-permohonan", { replace: true });
            return;
          }
          if (regex === "PENERBIT_LAPORAN") {
            navigate("/penerbit-laporan", { replace: true });
            return;
          }
        });
      } catch (error: any) {
        console.error(error.response.data);
      }
    }

    fetch();
  }, []);

  return <Spinner />;
};

export default IndexPage;
