import { Button, Heading, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { FbApp } from "../../../firebase/config";
import toast from "react-hot-toast";
import { useFirestore } from "hooks/useCreate";
import { GenerateId } from "model/GenerateId";
import { PelangganCreateTypes } from "pages/petugas-regist/pelanggan/pelanggan.types";
import React, { useState } from "react";

import { getFunctions, httpsCallable } from "firebase/functions";
const functions = getFunctions(FbApp, "asia-southeast2");

interface Regist {
  id: string;
  email: string;
  password: string;
  roles: string;
}

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
  const toasts = useToast();
  const { onCreate, loading } = useFirestore("pelanggan");
  const [data, setData] = useState<PelangganCreateTypes>({
    id: GenerateId("PLGN"),
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
      toasts({
        description: "Password tidak cocok",
        status: "error",
      });
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
      const addMessage = httpsCallable(functions, "createAccount");
      addMessage({
        id: idx,
        email: data.email,
        password: data.password,
        roles: data.jenisPengguna,
      });
      const mocking = {
        id: idx,
        alamat: data.alamat,
        email: data.email,
        jenisPengguna: "pelanggan",
        namaLengkap: data.namaLengkap,
        namaUsaha: data.namaUsaha,
        createdAt: Date.now(),
        phoneNumber: data.phoneNumber,
      };
      await onCreate<any>(mocking, idx);
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
          type={"number"}
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
