import { Button, Heading, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { useFirestore } from "hooks/useCreate";
import { useFunctions } from "hooks/useFunctions";
import React, { FC, useEffect, useState } from "react";
import { Pelangganypes } from "./pelanggan.types";

interface EditPelangganProps {
  data: Pelangganypes;
}

function ValidateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

const EditPelanggan: FC<EditPelangganProps> = ({ data: datas }) => {
  const toasts = useToast();
  const { onUpdate, loading, mutate } = useFirestore("pelanggan");
  const [data, setData] = useState<Pelangganypes>(datas);
  const { useCallFunc } = useFunctions();

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const OnUpdatePelanggan = async () => {
    if (!ValidateEmail(data.email)) {
      toasts({
        description: "Email tidak valid",
        status: "error",
      });
      return;
    }
    try {
      if (
        data.email !== datas.email ||
        data.jenisPengguna !== datas.jenisPengguna
      ) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCallFunc(
          {
            id: data?.id,
            email: data?.email,
            roles: data?.jenisPengguna,
          },
          "updateAccount"
        );
      }

      await onUpdate<Pelangganypes>(data, String(data.id));
      mutate(["pelanggan"]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Edit Pelanggan</Heading>
      <SimpleGrid columns={1} spacing={3} w={"full"}>
        <InputLabel
          label="Nama Usaha"
          onChange={(e) => OnChangeData("namaUsaha", e.target.value)}
          value={data.namaUsaha}
        />
        <InputLabel
          label="Nama Lengkap"
          onChange={(e) => OnChangeData("namaLengkap", e.target.value)}
          value={data.namaLengkap}
        />
        <InputLabel
          label="Nomor Handphone"
          type={"number"}
          onChange={(e) => OnChangeData("phoneNumber", e.target.value)}
          value={data.phoneNumber}
        />
        <InputLabel
          label="Alamat"
          onChange={(e) => OnChangeData("alamat", e.target.value)}
          value={data.alamat}
        />

        <InputLabel
          label="Email"
          onChange={(e) => OnChangeData("email", e.target.value)}
          value={data.email}
        />
      </SimpleGrid>

      <Button
        leftIcon={<CheckBoxIcons />}
        colorScheme="blue"
        variant="solid"
        rounded={"3xl"}
        isLoading={loading}
        onClick={OnUpdatePelanggan}
      >
        Update
      </Button>
    </Stack>
  );
};

export default EditPelanggan;
