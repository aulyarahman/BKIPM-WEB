import {
  Box,
  Button,
  Divider,
  HStack,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Wrap from "layout/root";
import { ColumnsDetailLaporan } from "./ColumnDetailLaporan";
import Tables from "components/tables";

import { Modals } from "components";
import { FC, useEffect, useState } from "react";
import { useFirestore } from "hooks/useCreate";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { useParams } from "react-router-dom";
import { HasilUjiLabTypes } from "./types";
import AddDaftarUjiLab from "./AddDataUjiLab";
import EditDataUjiLab from "./EditDataUjiLab";
import DeleteDataUjiLab from "./DeleteDataUjiLab";

const AddUjiLab = () => {
  const router = useParams();
  const [isOpen, setOpen] = useState(false);
  const {
    columns,
    bradCumbs,
    OnDelete,
    OnUpdate,
    id,
    setOnDelete,
    setOnUpdate,
  } = ColumnsDetailLaporan();
  const [datas, setData] = useState<DaftarPengajuan | undefined>();
  const { data } = useFirestore<HasilUjiLabTypes>(
    `/uji-lab/${router.id}`,
    "hasil-uji"
  );
  const { onFetchId } = useFirestore<DaftarPengajuan>(`uji-lab`);

  useEffect(() => {
    Promise.all([onFetchId<DaftarPengajuan>(String(router.id))]).then((res) => {
      setData(res[0]);
    });
  }, []);

  if (!datas) {
    return (
      <Wrap activeNum={2} items={bradCumbs}>
        <Spinner />
      </Wrap>
    );
  }

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      <Modals isOpen={isOpen} setOpen={setOpen}>
        <AddDaftarUjiLab setOpen={setOpen} />
      </Modals>

      <Modals isOpen={OnUpdate} setOpen={setOnUpdate}>
        <EditDataUjiLab data={id!} />
      </Modals>
      {OnDelete && (
        <Modals isOpen={OnDelete} setOpen={setOnDelete}>
          <DeleteDataUjiLab id={id?.id!} />
        </Modals>
      )}

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
          Buat Laporan Uji Lab
        </Text>
        <SimpleGrid columns={3} columnGap={"300px"} rowGap={"30px"}>
          <VStack align="start">
            <Text fontWeight={"bold"}>Customer</Text>
            <Text>{datas.namePelanggan}</Text>
          </VStack>
          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Tanggal Masuk</Text>
            <Text>{`${
              new Date(datas.createdAt).toISOString().split("T")[0]
            }`}</Text>
          </VStack>

          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Nomor Sampel Uji</Text>
            <Text>{datas.numSampleUji}</Text>
          </VStack>
          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Jenis Contoh Uji</Text>
            <Text>{datas.jenisContohUji}</Text>
          </VStack>
          {/*  */}
          <VStack align="start">
            <Text fontWeight={"bold"}>Kode Contoh Uji</Text>
            <Text>{datas.kodeContohUji}</Text>
          </VStack>
        </SimpleGrid>
        {/*  */}
        <Divider />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Text fontWeight={"bold"}>Hasil Uji</Text>
          <Spacer />
          <Text
            fontWeight={"bold"}
            color={"blue.400"}
            pr={10}
            onClick={() => {
              setOpen(true);
            }}
            _hover={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Tambah Data
          </Text>
        </HStack>
        <Box w={"77vw"}>
          {!data ? (
            <Spinner />
          ) : (
            <Tables
              columns={columns}
              data={data as unknown as HasilUjiLabTypes[]}
            />
          )}
        </Box>
      </VStack>
    </Wrap>
  );
};

export default AddUjiLab;
