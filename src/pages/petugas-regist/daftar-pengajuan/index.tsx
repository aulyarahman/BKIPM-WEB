import { Modals, SearchButton, Tables } from "components";
import { Spinner } from "@chakra-ui/spinner";
import { useFirestore } from "hooks/useCreate";
import Wrap from "layout/root";
import { useState } from "react";
import AddPengujian from "./add-pengujian";
import { Columns } from "./column";
import { DaftarPengajuan } from "./types";
import UpdatePengajuan from "./edit-pengajuan";

const PelangganRegistrasi: React.FC = () => {
  const { columns, bradCumbs, OnEdit, id, setOnEdit } = Columns();
  const { data, error } = useFirestore<DaftarPengajuan>("pengajuan");
  const [openAdd, setOpenAdd] = useState(false);

  if (error) {
    return (
      <Wrap activeNum={2} items={bradCumbs}>
        <p>{error}</p>
      </Wrap>
    );
  }

  if (!data) {
    return (
      <Wrap activeNum={2} items={bradCumbs}>
        <Spinner />
      </Wrap>
    );
  }

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      {OnEdit && (
        <Modals isOpen={OnEdit} setOpen={setOnEdit}>
          <UpdatePengajuan data={id!} />
        </Modals>
      )}
      {openAdd && (
        <Modals isOpen={openAdd} setOpen={setOpenAdd}>
          <AddPengujian setOpen={setOpenAdd} />
        </Modals>
      )}

      <SearchButton
        labelBtn="Buat Pengajuan"
        onClick={() => setOpenAdd(true)}
        show="sdsdd"
      />
      <Tables columns={columns} data={data} />
    </Wrap>
  );
};

export default PelangganRegistrasi;
