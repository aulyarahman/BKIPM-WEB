import { Button, Heading, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { useFirestore } from "hooks/useCreate";
import { useFunctions } from "hooks/useFunctions";
import { GenerateId } from "model/GenerateId";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PelangganCreateTypes } from "./pelanggan.types";

function ValidateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

function ValidateNumber(num: string) {
  if (/^\/(\d+)$/.test(num)) {
    return true;
  }
  return false;
}

const AddPleanggan = () => {
  const { onCreate, loading, mutate } = useFirestore("pelanggan");
  const { useCallFunc } = useFunctions();
  const toasts = useToast();
  const [data, setData] = useState<PelangganCreateTypes>({
    id: GenerateId("PELANGGAN"),
    alamat: "",
    email: "",
    jenisPengguna: "pelanggan",
    namaLengkap: "",
    namaUsaha: "",
    phoneNumber: "",
    password: "",
    passwordKonfirmasi: "",
    createdAt: Date.now(),
  });

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const OnCreatePelanggan = async () => {
    if (data.password !== data.passwordKonfirmasi) {
      toast.error("Password tidak cocok");
      return;
    }

    if (!ValidateEmail(data.email)) {
      toasts({
        description: "Email tidak valid",
        status: "error",
      });
      return;
    }

    // if (!ValidateNumber(data.phoneNumber)) {
    //   toasts({
    //     description: "Masukkan nomor yang valid",
    //     status: "error",
    //   });
    //   return;
    // }

    if (
      !data.alamat ||
      !data.namaLengkap ||
      !data.namaUsaha ||
      !data.phoneNumber ||
      !data.password
    ) {
      toasts({
        description: "Data Tidak boleh kosong",
        status: "error",
      });
      return;
    }

    const idx = GenerateId(`${data.jenisPengguna}`).toUpperCase();
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallFunc(
        {
          id: idx,
          email: data?.email,
          roles: data?.jenisPengguna,
          password: data?.password,
        },
        "createAccount"
      );
      const mocking = {
        id: idx,
        alamat: data.alamat,
        email: data.email,
        jenisPengguna: "pelanggan",
        namaLengkap: data.namaLengkap,
        namaUsaha: data.namaUsaha,
        phoneNumber: data.phoneNumber,
        createdAt: Date.now(),
      };
      await onCreate<any>(mocking, idx);
      mutate(["petugas"]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Tambah Pelanggan</Heading>

      <SimpleGrid columns={1} rowGap={2} w={"full"}>
        <InputLabel
          label="Nama Usaha"
          onChange={(e) => OnChangeData("namaUsaha", e.target.value)}
        />
        <InputLabel
          label="Nama Lengkap"
          onChange={(e) => OnChangeData("namaLengkap", e.target.value)}
        />
        <InputLabel
          label="Nomor Handphone"
          onChange={(e) => OnChangeData("phoneNumber", e.target.value)}
        />
        <InputLabel
          label="Alamat"
          onChange={(e) => OnChangeData("alamat", e.target.value)}
        />

        {/*  */}

        <InputLabel
          label="Email"
          onChange={(e) => OnChangeData("email", e.target.value)}
        />
        <InputLabel
          label="Password"
          onChange={(e) => OnChangeData("password", e.target.value)}
        />
        <InputLabel
          label="Konfirmasi Password"
          onChange={(e) => OnChangeData("passwordKonfirmasi", e.target.value)}
        />
      </SimpleGrid>

      <Button
        leftIcon={<CheckBoxIcons />}
        colorScheme="blue"
        variant="solid"
        w={"full"}
        rounded={"3xl"}
        isLoading={loading}
        onClick={OnCreatePelanggan}
      >
        Simpan
      </Button>
    </Stack>
  );
};

export default AddPleanggan;
