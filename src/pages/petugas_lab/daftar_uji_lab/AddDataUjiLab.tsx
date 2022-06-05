import { Stack, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import { InputLabel, ButtonSave } from "components";
import { FbFirestore } from "../../../firebase/config";
import { ToastTypes } from "hooks/useCreate";
import { GenerateId } from "model/GenerateId";
import React, { FC, useRef, useState } from "react";
import { HasilUjiLabTypes } from "./types";
import { useParams } from "react-router-dom";
import { mutate } from "swr";

interface AddDaftarUjiLabProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDaftarUjiLab: FC<AddDaftarUjiLabProps> = ({ setOpen }) => {
  const router = useParams();
  const toast = useToast();
  const toastIdRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HasilUjiLabTypes>({
    id: GenerateId("HASIL"),
    hasilUji: "",
    metodePengujian: "",
    nomorPengajuan: "",
    createdAt: Date.now(),
    parameter: "",
    persyaratan: "",
    tanggalPengujian: Date.now(),
  });

  function addToast({ description, status, title, id }: ToastTypes) {
    toastIdRef.current = toast({
      id,
      title,
      description,
      position: "bottom-right",
      status,
      variant: "left-accent",
    });
  }

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const Creates = async () => {
    const datesConv = new Date(data.tanggalPengujian).getTime();
    setLoading(true);
    try {
      await FbFirestore.doc(`/uji-lab/${router.id}`)
        .collection("hasil-uji")
        .doc(`${data.id}`)
        .set({
          ...data,
          tanggalPengujian: datesConv,
        });
      addToast({
        status: "success",
        title: "Susccess Create",
        description: "Berhasil Menambahkan Data",
      });
      setLoading(false);
      setOpen(false);
      mutate(["hasil-uji"]);
    } catch (e) {
      setLoading(false);

      addToast({
        status: "error",
        title: "Error Create",
        description: "Gagal Menambahkan Data",
      });
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Isi Data Hasil Uji Laboratorium</Heading>

      <SimpleGrid columns={2} spacing={3} w={"full"}>
        <InputLabel
          label="Tanggal Pengujian"
          type={"date"}
          onChange={(e) => OnChangeData("tanggalPengujian", e.target.value)}
        />
        <InputLabel
          label="Persyaratan"
          onChange={(e) => OnChangeData("persyaratan", e.target.value)}
        />
        <InputLabel
          label="Parameter"
          onChange={(e) => OnChangeData("parameter", e.target.value)}
        />
        <InputLabel
          label="Nomor Pengajuan"
          onChange={(e) => OnChangeData("nomorPengajuan", e.target.value)}
        />
        <InputLabel
          label="Metode Pengujian"
          onChange={(e) => OnChangeData("metodePengujian", e.target.value)}
        />

        <InputLabel
          label="Hasil Uji"
          onChange={(e) => OnChangeData("hasilUji", e.target.value)}
        />
      </SimpleGrid>

      <ButtonSave onClick={Creates} isLoading={loading}>
        Simpan
      </ButtonSave>
    </Stack>
  );
};

export default AddDaftarUjiLab;
