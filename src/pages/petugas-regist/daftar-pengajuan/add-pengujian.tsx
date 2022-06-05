import {
  Button,
  Heading,
  Stack,
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import Select from "react-select";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { useFirestore } from "hooks/useCreate";
import { GenerateId } from "model/GenerateId";
import { FC, useEffect, useState } from "react";
import { Pelangganypes } from "../pelanggan/pelanggan.types";
import { BentukTypes, ReqCreateDaftarPengajuan, SelectTypes } from "./types";

// async function asyncForEach(
//   array: any[],
//   callback: (sum: any, s?: number, k?: any[]) => void
// ) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// }

const AddPengujian: FC<{ setOpen(v: boolean): void }> = ({ setOpen }) => {
  const { data: dataPelanggan } = useFirestore<Pelangganypes>("pelanggan");
  const { data: dataBentuk } = useFirestore<BentukTypes>("contoh_uji");
  const { onCreate, loading } = useFirestore<Pelangganypes>("pengajuan");
  const [optionUser, setOptionUser] = useState<any[]>([]);
  const [optionBentuk, setOptionBentuk] = useState<SelectTypes[]>([]);
  const [dataAddPengujian, setDataPengajian] =
    useState<ReqCreateDaftarPengajuan>({
      id: GenerateId("PENGAJUAN"),
      bentuk: "",
      createdAt: Date.now(),
      jenisContohUji: "",
      kodeContohUji: "",
      status: "Data sedang ditinjau",
      numSampleUji: "",
      pelanggan: "",
    });

  useEffect(() => {
    const _d: any[] = [];
    const _dd: SelectTypes[] = [];

    dataPelanggan?.forEach((v) => {
      _d.push({
        value: v,
        label: v.namaLengkap,
      });
    });
    dataBentuk?.forEach((r) => {
      _dd.push({
        value: r.bentuk,
        label: r.bentuk,
      });
    });

    setOptionUser(_d);
    setOptionBentuk(_dd);
  }, [dataPelanggan, dataBentuk]);

  const OnChangeData = (key: string, val: string) => {
    setDataPengajian((v) => ({ ...v, [key]: val }));
  };

  const OnAjukan = async () => {
    try {
      await onCreate<ReqCreateDaftarPengajuan>(
        dataAddPengujian,
        `${dataAddPengujian.id}`
      );
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Pengajuan Uji</Heading>
      <SimpleGrid columns={1} rowGap={2} w={"full"}>
        <Box>
          <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
            Pelanggan
          </Text>
          <Select
            options={optionUser}
            onChange={(e) => {
              setDataPengajian((v) => ({
                ...v,
                pelanggan: e?.value.id,
              }));
            }}
          />
        </Box>
        <InputLabel
          label="Nomor Simple Uji"
          onChange={(e) => OnChangeData("numSampleUji", e.target.value)}
        />
        <InputLabel
          label="Jenis Contoh Uji"
          onChange={(e) => OnChangeData("jenisContohUji", e.target.value)}
        />
        <InputLabel
          label="Kode Contoh Uji"
          onChange={(e) => OnChangeData("kodeContohUji", e.target.value)}
        />
        <Box>
          <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
            Bentuk
          </Text>
          <Select
            options={optionBentuk}
            onChange={(e) => OnChangeData("bentuk", `${e?.value}`)}
          />
        </Box>
      </SimpleGrid>

      <Button
        leftIcon={<CheckBoxIcons />}
        colorScheme="blue"
        variant="solid"
        w={"full"}
        rounded={"3xl"}
        onClick={OnAjukan}
        isLoading={loading}
      >
        Ajukan
      </Button>
    </Stack>
  );
};

export default AddPengujian;
