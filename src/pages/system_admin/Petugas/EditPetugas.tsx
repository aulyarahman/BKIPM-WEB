import {
  Button,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  Select,
} from "@chakra-ui/react";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { useFirestore } from "hooks/useCreate";
import { useFunctions } from "hooks/useFunctions";
import React, { FC, useEffect, useState } from "react";
import { PetugasTypes } from "./petugas.types";

interface EditPetugasProps {
  data: PetugasTypes;
}

const options = [
  {
    label: "System Admin",
    value: "sysadmin",
  },
  {
    label: "Penerbit Laporan",
    value: "penerbit_laporan",
  },
  {
    label: "Petugas Lab",
    value: "petugas_lab",
  },
  {
    label: "Petugas Registrasi",
    value: "petugas_registrasi",
  },
];

const EditPetugas: FC<EditPetugasProps> = ({ data: datas }) => {
  const { onUpdate, loading } = useFirestore("petugas");
  const [data, setData] = useState<PetugasTypes>(datas);
  const { useCallFunc } = useFunctions();

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const OnUpdatePelanggan = async () => {
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

      await onUpdate<PetugasTypes>(data, String(data.id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Edit Pelanggan</Heading>
      <SimpleGrid columns={1} spacing={3} w={"full"}>
        <VStack align={"start"}>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Jenis Pengguna
          </Text>
          <Select
            placeholder="Jenis Pengguna"
            onChange={(e: any) => {
              OnChangeData("jenisPengguna", e.target.value);
            }}
          >
            <option value="" disabled hidden>
              {datas.jenisPengguna}
            </option>
            {options.map((it) => (
              <option value={it.value}>{it.label}</option>
            ))}
          </Select>
        </VStack>

        <InputLabel
          label="Email"
          onChange={(e) => OnChangeData("email", e.target.value)}
          value={data.email}
        />
        <InputLabel
          label="Nama Lengkap"
          onChange={(e) => OnChangeData("nama", e.target.value)}
          value={data.nama}
        />

        <InputLabel
          label="Nomor Handphone"
          type={"number"}
          onChange={(e) => OnChangeData("phoneNumber", e.target.value)}
          value={data.phoneNumber}
        />

        <InputLabel
          label="Jabatan"
          onChange={(e) => OnChangeData("jabatan", e.target.value)}
          value={data.jabatan}
        />

        <InputLabel
          label="Pangkat"
          onChange={(e) => OnChangeData("pangkat", e.target.value)}
          value={data.pangkat}
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

export default EditPetugas;
