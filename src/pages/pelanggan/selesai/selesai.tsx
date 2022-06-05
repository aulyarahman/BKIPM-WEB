import { Spinner } from "@chakra-ui/react";
import { Tables } from "components";
import { useFirestore } from "hooks/useCreate";
import Wrap from "layout/root";
import { HasilUjiLaporan } from "pages/system_admin/LaporanHasilUji/types-hasil";
import { Columns } from "./cols";

const Selesai = () => {
  const { columns, bradCumbs } = Columns();
  const { data } = useFirestore<HasilUjiLaporan>("laporan-hasil");

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default Selesai;
