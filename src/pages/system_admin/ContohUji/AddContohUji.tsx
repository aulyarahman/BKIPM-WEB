import { Stack, Heading, SimpleGrid } from "@chakra-ui/react";
import { InputLabel, ButtonSave } from "components";
import { useFirestore } from "hooks/useCreate";
import { GenerateId } from "model/GenerateId";
import React, { useState } from "react";
import { ContohUjiTypes } from "./types-contohuji";

const AddContohUji = () => {
  const { onCreate, loading, mutate } = useFirestore("contoh_uji");
  const [data, setData] = useState<ContohUjiTypes>({
    bentuk: "",
    id: GenerateId("CONTOH_UJI"),
    namaLatin: "",
    namaUmum: "",
    createdAt: Date.now(),
  });

  const OnChangeHandle = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Tambah Contoh Uji</Heading>

      <SimpleGrid columns={1} spacing={3} w={"full"}>
        <InputLabel
          label="Nama Umum"
          onChange={(e) => OnChangeHandle("namaUmum", e.target.value)}
        />
        <InputLabel
          label="Nama Latin"
          onChange={(e) => OnChangeHandle("namaLatin", e.target.value)}
        />
        <InputLabel
          label="Bentuk"
          onChange={(e) => OnChangeHandle("bentuk", e.target.value)}
        />
      </SimpleGrid>

      <ButtonSave
        isLoading={loading}
        onClick={async () => {
          try {
            await onCreate(data, data.id!);
            mutate(["contoh_uji"]);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Simpan
      </ButtonSave>
    </Stack>
  );
};

export default AddContohUji;
