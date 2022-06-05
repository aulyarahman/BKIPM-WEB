import React from "react";
import Wrap from "layout/root";
import { Columns } from "./column";
import { SearchButton, Tables } from "components";
import { useFirestore } from "hooks/useCreate";
import { HasilUjiLaporan } from "./types-hasil";
import { Spinner } from "@chakra-ui/react";

const LaporanHasilUji = () => {
  const { bradCumbs, columns } = Columns();
  const { data, error } = useFirestore<HasilUjiLaporan>("laporan-hasil");

  return (
    <Wrap activeNum={1} items={bradCumbs}>
      <SearchButton show="sds" />
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default LaporanHasilUji;
