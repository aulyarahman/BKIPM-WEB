import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Colors } from "constant";
import Wrap from "layout/root";
import { Columns } from "./column";
import QRCode from "react-qr-code";
import Pdf from "react-to-pdf";
import { createRef, FC, useEffect, useMemo, useState } from "react";
import { ButtonSave } from "components";
import { useLocation, useParams } from "react-router-dom";
import { FbFirestore } from "../../../firebase/config";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { HasilUjiLabTypes } from "pages/petugas_lab/daftar_uji_lab/types";
import { useFirestore } from "hooks/useCreate";
import { Pelangganypes } from "pages/petugas-regist/pelanggan/pelanggan.types";

const ref = createRef<any>();

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Tables = styled.table`
  border: 1px solid black;
  margin-top: 10px;
  tr > th {
    font-size: 13px;
    font-weight: 10px;
  }
  th,
  td {
    margin: 0;
    padding: 0.5rem;
    font-size: 12px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-top: 1px solid black;
  }
`;

const StackImage: FC<{ no: string }> = ({ no }) => (
  <HStack align={"flex-start"}>
    <HStack spacing={"40px"} mb={"50px"}>
      <Image
        src="/asset/logo-kementrian-kelautan.png"
        width="50pp"
        height="60px"
      />
      <Image src="/asset/logo-bkipm.png" width="70px" height="60px" />
      <Image src="/asset/kan-logo.png" width="100px" height="50px" />
    </HStack>
    <Spacer />
    <Text>Nomor : {no}</Text>
  </HStack>
);

const StackHeading = () => (
  <VStack experimental_spaceY={3} align={"start"} mt={-3}>
    <Heading textTransform={"uppercase"} color={Colors.BLUE} size={"sm"}>
      Kementerian Kelautan dan Perikanan Badan Karantina, Pengendalian Mutu dan
      Keamanan hasil perikanan Balai besar karantina ikan, pengendalian mutu dan
      keamanan hasil perikanan makassar laboratorium penguji
    </Heading>
    <Heading fontSize={"xs"} fontWeight={"semibold"}>
      Jl. Andi Djemma No.7 Makassar 90135 Telp (0411) 874793, Fax (0411) 555159,
      laman
      <Text ml={2} as={"span"} color={Colors.BLUE}>
        makassar@bkipm.kkp.go.id
      </Text>
    </Heading>
  </VStack>
);

interface StackTitleProps {
  title: string;
  placeholder: string;
  w?: string;
}

const StackTitle: React.FC<StackTitleProps> = ({ placeholder, title, w }) => (
  <VStack spacing={0} align={"start"}>
    <Text
      fontWeight={"semibold"}
      fontSize={"sm"}
      textDecoration={"underline"}
      w={"300px"}
    >
      {title}
    </Text>
    <Text color={Colors.GRAY} fontStyle={"italic"} fontSize={"sm"}>
      {placeholder}
    </Text>
  </VStack>
);

const StackValueLaporan: FC<{
  data: DaftarPengajuan;
  namePengguna: string;
  alamat: string;
}> = ({ data, alamat, namePengguna }) => {
  return (
    <VStack align={"start"}>
      <HStack>
        <StackTitle title="Laporan Hasil Uji" placeholder="Report Of Test" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          Nomor:
        </Text>
      </HStack>
      <HStack>
        <StackTitle title="Jenis Contoh Uji" placeholder="Report of test" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          : {data.jenisContohUji}
        </Text>
      </HStack>
      {/*  */}
      <HStack>
        <StackTitle title="Kode Contoh Uji" placeholder="Report of test" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          : {data.kodeContohUji}
        </Text>
      </HStack>
      {/*  */}
      <HStack>
        <StackTitle title="Tanggal Diterima" placeholder="Report of test" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          : {new Date(data.createdAt).toISOString().split("T")[0]}
        </Text>
      </HStack>
      {/*  */}
      <HStack>
        <StackTitle title="Nama Costumer" placeholder="Costumer Name" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          : {namePengguna}
        </Text>
      </HStack>
      {/*  */}
      <HStack>
        <StackTitle title="Alamat" placeholder="Address" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          : {alamat}
        </Text>
      </HStack>
      {/*  */}
      <HStack>
        <StackTitle title="Data Contoh Uji" placeholder="Data of sample" />
        <Text fontWeight={"semibold"} fontSize={"sm"}>
          : {data.jenisContohUji}
        </Text>
      </HStack>
    </VStack>
  );
};

const DetailTable: FC<{ data: HasilUjiLabTypes[] }> = ({ data }) => {
  return (
    <Tables>
      <thead>
        <tr>
          <th>No</th>
          <th>Parameter</th>
          <th>Nomor Pengujian</th>
          <th>Tanggal Pengujian</th>
          <th>Hasil Uji</th>
          <th>Persyaratan</th>
          <th>Metode Pengujian</th>
        </tr>
      </thead>
      <tbody>
        {data.map((it, key) => (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{it.parameter}</td>
            <td>{it.nomorPengajuan}</td>
            <td>{new Date(it.tanggalPengujian).toISOString().split("T")[0]}</td>
            <td>{it.hasilUji}</td>
            <td>{it.persyaratan}</td>
            <td>{it.metodePengujian}</td>
          </tr>
        ))}
      </tbody>
    </Tables>
  );
};

const GeneratePdfDetailLaporan = () => {
  const router = useParams();
  const query = useQuery();
  const { bradCumbs } = Columns();
  const [data, setData] = useState<DaftarPengajuan | undefined>();
  const [dataHasilUji, setDataHasilUji] = useState<HasilUjiLabTypes[]>([]);
  const [detailUser, setDetailUser] = useState<Pelangganypes | undefined>();
  const { onFetchId } = useFirestore<DaftarPengajuan>("uji-lab");
  const { onFetchId: FindByIdPelanggan } =
    useFirestore<Pelangganypes>("pelanggan");

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
        setDataHasilUji(datas);
        return res[0];
      })
      .then(async (res) => {
        const users = await FindByIdPelanggan<Pelangganypes>(
          String(res.pelanggan)
        );
        setDetailUser(users);
      });
  }, []);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      <Flex direction={"row"}>
        <Box bg={Colors.WHITE} p={5} w={"40vw"} ref={ref}>
          {/* KOP */}
          <StackImage no={`${query.get("num")}`} />
          <StackHeading />
          <Divider mt={3} lineHeight={"10px"} size={"10px"} />
          {/* END */}
          <Flex direction={"column"} align={"start"} mb={5}>
            <StackValueLaporan
              data={data!}
              namePengguna={`${detailUser?.namaLengkap}`}
              alamat={`${detailUser?.alamat}`}
            />
            <DetailTable data={dataHasilUji!} />
          </Flex>
          <QRCode value={`${query.get("num")}`} size={100} />
        </Box>
        <Box bg={Colors.WHITE} h={"fit-content"} rounded={"2xl"} p={5} ml={10}>
          <Pdf targetRef={ref} filename={`${Date.now()}.pdf`}>
            {({ toPdf }: any) => (
              <ButtonSave onClick={toPdf}>Download</ButtonSave>
            )}
          </Pdf>
        </Box>
      </Flex>
    </Wrap>
  );
};

export default GeneratePdfDetailLaporan;
