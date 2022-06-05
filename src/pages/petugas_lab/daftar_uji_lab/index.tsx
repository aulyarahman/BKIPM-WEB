import {
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Button, Modals, SearchButton, Tables } from "components";
import { useFirestore } from "hooks/useCreate";
import Wrap from "layout/root";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { Columns } from "./column";

const DaftarUjiLab = () => {
  const { columns, bradCumbs, id } = Columns();
  const { data, error } = useFirestore<DaftarPengajuan>("uji-lab");

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      {/*  */}
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default DaftarUjiLab;
