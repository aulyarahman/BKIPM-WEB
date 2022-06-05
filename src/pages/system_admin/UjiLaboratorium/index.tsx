import React from "react";
import Wrap from "layout/root";
import { Columns } from "./column";
import { Modals, Tables } from "components";

import { useFirestore } from "hooks/useCreate";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { Spinner } from "@chakra-ui/react";
import EditLaboratorium from "./EditLaboratorium";

const UjiLaboratorium = () => {
  const { bradCumbs, columns, OnEdit, id, setOnEdit } = Columns();
  const { data } = useFirestore<DaftarPengajuan>("uji-lab");

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      {OnEdit && (
        <Modals isOpen={OnEdit} setOpen={setOnEdit}>
          <EditLaboratorium data={id!} setOnEdit={setOnEdit} />
        </Modals>
      )}
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default UjiLaboratorium;
