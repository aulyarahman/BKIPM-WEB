import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Wrap from "layout/root";
import { ColumnsDetailLaporan } from "./ColumnDetailLaporan";
import Tables from "components/tables";
import { FbFirestore } from "../../../firebase/config";

import { FC, useEffect, useState } from "react";
import { useFirestore } from "hooks/useCreate";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { Link, useNavigate, useParams } from "react-router-dom";

import { mutate } from "swr";
import { HasilUjiLabTypes } from "pages/petugas_lab/daftar_uji_lab/types";
import { ButtonSave } from "components";
import { GenerateId } from "model/GenerateId";

const DetailDaftarLaporan = () => {
  const router = useParams();
  const navigate = useNavigate();
  const { columns, bradCumbs } = ColumnsDetailLaporan();
  const [noLaporan, setnoLaporan] = useState("");
  const [data, setData] = useState<DaftarPengajuan | undefined>();
  const [dataHasilUji, setDataHasilUji] = useState<HasilUjiLabTypes[]>([]);
  const { onFetchId, onUpdate } = useFirestore<DaftarPengajuan>("uji-lab");
  const { onCreate } = useFirestore<DaftarPengajuan>("laporan-hasil");

  useEffect(() => {
    const datas: any[] = [];
    Promise.all([
      onFetchId<DaftarPengajuan>(String(router.id)),
      FbFirestore.doc(`/uji-lab/${router.id}`).collection("hasil-uji").get(),
    ])
      .then((res) => {
        setData(res[0]);
        res[1].forEach((iv) => {
          datas.push(iv.data());
        });
        mutate("hasil-uji", datas);
      })
      .then(async () => {
        const user = await mutate("hasil-uji", datas);
        setDataHasilUji(user);
      });
  }, []);

  if (!data) {
    return (
      <Wrap activeNum={2} items={bradCumbs}>
        <Spinner />
      </Wrap>
    );
  }

  const OnCreateLaporanHasil = async () => {
    try {
      const idx = GenerateId("LPRNHSL");
      const mocks = {
        ...data,
        id: idx,
        idUjiLab: router.id,
        status: "selesai",
        noLhu: noLaporan,
      };
      await onCreate<any>(mocks, mocks.id);
      await onUpdate({ status: "selesai" }, `${router.id}`);
      // navigate(`/daftar-laporan/${router.id}/generate/${noLaporan}`, {
      //   replace: true,
      // });
      navigate(`/daftar-laporan`, { replace: true });
      window.open(`/daftar-laporan/${router.id}/generate?num=${noLaporan}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      <VStack
        maxH={"77vh"}
        minH={"77vh"}
        overflow="auto"
        bg={"white"}
        align="start"
        px={5}
        pt={5}
        pb={5}
        rounded={"xl"}
      >
        <Text fontWeight={"bold"} fontSize="xl">
          Buat Laporan Hasiil Uji
        </Text>
        <VStack align="start">
          <Text fontWeight={"bold"}>Nomor Laporan hasil uji</Text>
          <Input onChange={(e: any) => setnoLaporan(e.target.value)} />
        </VStack>
        <SimpleGrid columns={3} columnGap={"300px"} rowGap={"30px"}>
          <VStack align="start">
            <Text fontWeight={"bold"}>Customer</Text>
            <Text>{data.namePelanggan}</Text>
          </VStack>
          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Tanggal Masuk</Text>
            <Text>{`${
              new Date(data.createdAt).toISOString().split("T")[0]
            }`}</Text>
          </VStack>

          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Nomor Sampel Uji</Text>
            <Text>{data.numSampleUji}</Text>
          </VStack>
          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Jenis Contoh Uji</Text>
            <Text>{data.jenisContohUji}</Text>
          </VStack>
          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Kode Contoh Uji</Text>
            <Text>{data.kodeContohUji}</Text>
          </VStack>
        </SimpleGrid>
        {/*  */}
        <Divider />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Text fontWeight={"bold"}>Hasil Uji</Text>
        </HStack>
        <Box w={"77vw"}>
          {!dataHasilUji ? (
            <Spinner />
          ) : (
            <Tables columns={columns} data={dataHasilUji} />
          )}
        </Box>
      </VStack>
      <HStack py={3}>
        {data.status === "selesai" ? (
          <></>
        ) : (
          <ButtonSave
            disabled={!noLaporan ? true : false}
            onClick={OnCreateLaporanHasil}
          >
            Simpan
          </ButtonSave>
        )}
      </HStack>
    </Wrap>
  );
};

export default DetailDaftarLaporan;
