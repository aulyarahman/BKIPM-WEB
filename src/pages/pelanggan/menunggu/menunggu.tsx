import { Spinner } from "@chakra-ui/react";
import { Tables } from "components";
import { useFirestore } from "hooks/useCreate";
import Wrap from "layout/root";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { Columns } from "./cols";

const Menunggu = () => {
  const { columns, bradCumbs } = Columns();
  const { data } = useFirestore<DaftarPengajuan>("uji-lab");

  return (
    <Wrap activeNum={1} items={bradCumbs}>
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default Menunggu;
