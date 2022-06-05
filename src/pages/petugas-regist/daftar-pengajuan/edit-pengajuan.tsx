import {
  Button,
  Heading,
  Stack,
  Box,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Select from "react-select";
import { CheckBoxIcons } from "components/icons";
import { InputLabel } from "components/inputs";
import { useFirestore } from "hooks/useCreate";
import { FC, useEffect, useState } from "react";
import { Pelangganypes } from "../pelanggan/pelanggan.types";
import { DaftarPengajuan, SelectTypes } from "./types";

interface UpdatePengajuanProps {
  data: DaftarPengajuan;
}

const FindDuplicate = (data: SelectTypes[], val: string) => {
  return data.find((x, ind) => x.value === val);
};

const UpdatePengajuan: FC<UpdatePengajuanProps> = ({ data }) => {
  const { data: dataPelanggan } = useFirestore<Pelangganypes>("pelanggan");
  const { onUpdate, loading } = useFirestore<Pelangganypes>("pengajuan");
  const [optionUser, setOptionUser] = useState<SelectTypes[]>([]);
  const [datas, setData] = useState<DaftarPengajuan>(data);

  const optionsBetuk = [
    { value: "Uji Lab", label: "Uji Lab" },
    { value: "Laporan Uji", label: "Laporan Uji" },
  ];

  useEffect(() => {
    const _d: SelectTypes[] = [];
    dataPelanggan?.forEach((v) => {
      _d.push({
        value: v.namaLengkap,
        label: v.namaLengkap,
      });
    });
    setOptionUser(_d);
  }, [dataPelanggan]);

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const OnAjukanUpdate = async () => {
    try {
      await onUpdate<DaftarPengajuan>(datas, `${datas.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Pengajuan Uji</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <Box>
            <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
              Pelanggan
            </Text>
            <Select
              defaultValue={FindDuplicate(optionUser, datas.pelanggan)}
              options={optionUser}
              onChange={(e) => OnChangeData("pelanggan", `${e?.value}`)}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <InputLabel
            label="Nomor Simple Uji"
            value={datas.numSampleUji}
            onChange={(e) => OnChangeData("numSampleUji", e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputLabel
            label="Jenis Contoh Uji"
            value={datas.jenisContohUji}
            onChange={(e) => OnChangeData("jenisContohUji", e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputLabel
            label="Kode Contoh Uji"
            value={datas.kodeContohUji}
            onChange={(e) => OnChangeData("kodeContohUji", e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Text mb="3px" fontSize={"sm"} fontWeight={"semibold"}>
              Bentuk
            </Text>
            <Select
              defaultValue={FindDuplicate(optionsBetuk, datas.bentuk)}
              options={optionsBetuk}
              onChange={(e) => OnChangeData("bentuk", `${e?.value}`)}
            />
          </Box>
        </GridItem>
      </Grid>

      <Button
        leftIcon={<CheckBoxIcons />}
        colorScheme="blue"
        variant="solid"
        rounded={"3xl"}
        onClick={OnAjukanUpdate}
        isLoading={loading}
      >
        Update
      </Button>
    </Stack>
  );
};

export default UpdatePengajuan;
