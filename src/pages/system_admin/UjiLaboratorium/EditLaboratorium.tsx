import { Box, Stack, Text, Select, Button } from "@chakra-ui/react";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { useFirestore } from "hooks/useCreate";
import {
  DaftarPengajuan,
  SelectTypes,
} from "pages/petugas-regist/daftar-pengajuan/types";
import { Pelangganypes } from "pages/petugas-regist/pelanggan/pelanggan.types";
import React, { FC, useEffect, useState } from "react";
import { PetugasTypes } from "../Petugas/petugas.types";

interface EditLaboratoriumProps {
  data: DaftarPengajuan;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditLaboratorium: FC<EditLaboratoriumProps> = ({
  data: datas,
  setOnEdit,
}) => {
  const [data, setData] = useState<DaftarPengajuan>(datas);
  const { data: dataPetugas } = useFirestore<PetugasTypes>("petugas");
  const { data: dataPelanggan } = useFirestore<Pelangganypes>("pelanggan");
  const { onUpdate, loading, mutate } = useFirestore<PetugasTypes>("uji-lab");
  const [optionPetugas, setOption] = useState<SelectTypes[]>([]);
  const [optionUser, setOptionUser] = useState<any[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const _d: SelectTypes[] = [];
    const _dd: any[] = [];

    dataPetugas?.forEach((v) => {
      _d.push({
        value: v.nama,
        label: v.nama,
      });
    });

    dataPelanggan?.forEach((v) => {
      _dd.push({
        value: v,
        label: v.namaLengkap,
      });
    });
    setOption(_d);
    setOptionUser(_dd);

    setTimeout(() => {
      setTime(2);
    }, 1000);
  }, [time]);

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const OnUpdate = async () => {
    try {
      await onUpdate<any>(data, data.id);
      mutate(["uji-lab"]);
      setOnEdit(false);
    } catch (e) {}
  };

  return (
    <Stack p={4} experimental_spaceY={4}>
      <Box>
        <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
          Petugas
        </Text>
        <Select
          placeholder="Petugas"
          onChange={(e: any) => {
            OnChangeData("petugas", e.target.value);
          }}
        >
          <option value={data.petugas} selected disabled hidden>
            {data.petugas}
          </option>
          {optionPetugas.map((it) => (
            <option
              value={it.value}
              selected={data.petugas === it.value ? true : false}
            >
              {it.value}
            </option>
          ))}
        </Select>
      </Box>

      <Box>
        <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
          Customer
        </Text>
        <Select
          placeholder="Customer"
          onChange={(e: any) => {
            const va = JSON.parse(e.target.value);
            setData((v) => ({
              ...v,
              pelanggan: va.id,
              namePelanggan: va.namaLengkap,
            }));
          }}
        >
          <option value={data.namePelanggan} selected disabled hidden>
            {data.namePelanggan}
          </option>
          {optionUser.map((it, id) => (
            <option
              key={id}
              value={JSON.stringify(it.value)}
              selected={data.namePelanggan === it.value ? true : false}
            >
              {it.value.namaLengkap}
            </option>
          ))}
        </Select>
      </Box>

      <InputLabel
        label="Jenis Contoh Uji"
        onChange={(e) => OnChangeData("jenisContohUji", e.target.value)}
        value={data.jenisContohUji}
      />
      <InputLabel
        label="Kode Contoh Uji"
        onChange={(e) => OnChangeData("kodeContohUji", e.target.value)}
        value={data.kodeContohUji}
      />

      <InputLabel
        label="Bentuk"
        onChange={(e) => OnChangeData("bentuk", e.target.value)}
        value={data.bentuk}
      />

      <Button
        leftIcon={<CheckBoxIcons />}
        colorScheme="blue"
        variant="solid"
        w={"full"}
        rounded={"3xl"}
        onClick={OnUpdate}
        isLoading={loading}
      >
        Update
      </Button>
    </Stack>
  );
};

export default EditLaboratorium;
