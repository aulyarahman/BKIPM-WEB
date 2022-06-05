import { Stack, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import { InputLabel, ButtonSave } from "components";
import { FbFirestore } from "../../../firebase/config";
import { ToastTypes, useFirestore } from "hooks/useCreate";
import React, { FC, useRef, useState } from "react";
import { HasilUjiLabTypes } from "./types";
import { useParams } from "react-router-dom";

interface AddDaftarUjiLabProps {
  data: HasilUjiLabTypes;
}

const EditDataUjiLab: FC<AddDaftarUjiLabProps> = ({ data: datas }) => {
  const router = useParams();
  const toast = useToast();
  const { mutate } = useFirestore("hasil-uji");
  const toastIdRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HasilUjiLabTypes>(datas);

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

  const Updates = async () => {
    const datesConv = new Date(data.tanggalPengujian).getTime();
    setLoading(true);
    try {
      await FbFirestore.doc(`/uji-lab/${router.id}`)
        .collection("hasil-uji")
        .doc(`${data.id}`)
        .update({
          ...data,
          tanggalPengujian: datesConv,
        });
      addToast({
        status: "success",
        title: "Susccess Update",
        description: "Berhasil Update Data",
      });
      mutate([`/uji-lab/${router.id}`, "hasil-uji"]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      addToast({
        status: "error",
        title: "Error Create",
        description: "Gagal Update Data",
      });
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Update Data Hasil Uji Laboratorium</Heading>

      <SimpleGrid columns={2} spacing={3} w={"full"}>
        <InputLabel
          label="Tanggal Pengujian"
          type={"date"}
          onChange={(e) => OnChangeData("tanggalPengujian", e.target.value)}
        />
        <InputLabel
          label="Persyaratan"
          value={data.persyaratan}
          onChange={(e) => OnChangeData("persyaratan", e.target.value)}
        />
        <InputLabel
          label="Parameter"
          value={data.parameter}
          onChange={(e) => OnChangeData("parameter", e.target.value)}
        />
        <InputLabel
          label="Nomor Pengajuan"
          value={data.nomorPengajuan}
          onChange={(e) => OnChangeData("nomorPengajuan", e.target.value)}
        />
        <InputLabel
          label="Metode Pengujian"
          value={data.metodePengujian}
          onChange={(e) => OnChangeData("metodePengujian", e.target.value)}
        />

        <InputLabel
          label="Hasil Uji"
          value={data.hasilUji}
          onChange={(e) => OnChangeData("hasilUji", e.target.value)}
        />
      </SimpleGrid>

      <ButtonSave onClick={Updates} isLoading={loading}>
        Update
      </ButtonSave>
    </Stack>
  );
};

export default EditDataUjiLab;
