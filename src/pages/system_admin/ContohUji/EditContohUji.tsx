import { Stack, Heading, SimpleGrid } from "@chakra-ui/react";
import { InputLabel, ButtonSave } from "components";
import { useFirestore } from "hooks/useCreate";
import React, { FC, useState } from "react";
import { ContohUjiTypes } from "./types-contohuji";

interface DataEdit {
  data: ContohUjiTypes;
}

const EditContohUji: FC<DataEdit> = ({ data: datas }) => {
  const { onUpdate, loading, mutate } = useFirestore("contoh_uji");
  const [data, setData] = useState<ContohUjiTypes>(datas);

  const OnChangeHandle = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const Update = async () => {
    try {
      await onUpdate(data, data.id!);
      mutate(["contoh_uji"]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Tambah Contoh Uji</Heading>

      <SimpleGrid columns={1} spacing={3} w={"full"}>
        <InputLabel
          label="Nama Umum"
          onChange={(e) => OnChangeHandle("namaUmum", e.target.value)}
          value={data.namaUmum}
        />
        <InputLabel
          label="Nama Latin"
          value={data.namaLatin}
          onChange={(e) => OnChangeHandle("namaLatin", e.target.value)}
        />
        <InputLabel
          label="Bentuk"
          value={data.bentuk}
          onChange={(e) => OnChangeHandle("bentuk", e.target.value)}
        />
      </SimpleGrid>

      <ButtonSave isLoading={loading} onClick={Update}>
        Update
      </ButtonSave>
    </Stack>
  );
};

export default EditContohUji;
