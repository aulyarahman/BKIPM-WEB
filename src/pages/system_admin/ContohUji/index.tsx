import React, { useState } from "react";
import Wrap from "layout/root";
import { Columns } from "./column";
import { Modals, SearchButton, Tables } from "components";
import AddContohUji from "./AddContohUji";
import { useFirestore } from "hooks/useCreate";
import { ContohUjiTypes } from "./types-contohuji";
import { Button, Spinner } from "@chakra-ui/react";
import EditContohUji from "./EditContohUji";

const ContohUji = () => {
  const {
    bradCumbs,
    columns,
    OpenDelete,
    OpenEdit,
    id,
    setOpenDelete,
    setOpenEdit,
  } = Columns();
  const { data, error, onDelete, loading } =
    useFirestore<ContohUjiTypes>("contoh_uji");
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Wrap activeNum={3} items={bradCumbs}>
      {OpenDelete && (
        <Modals isOpen={OpenDelete} setOpen={setOpenDelete}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <p style={{ fontSize: "18px" }}>Yakin ingin menghapus data ini ?</p>
            <Button
              colorScheme={"red"}
              isLoading={loading}
              onClick={async () => {
                const res = await onDelete(id?.id!);
                setOpenDelete(res);
              }}
            >
              Delete
            </Button>
          </div>
        </Modals>
      )}

      {OpenEdit && (
        <Modals isOpen={OpenEdit} setOpen={setOpenEdit}>
          <EditContohUji data={id!} />
        </Modals>
      )}
      <Modals isOpen={openAdd} setOpen={setOpenAdd}>
        <AddContohUji />
      </Modals>
      <SearchButton
        labelBtn="Tambah"
        onClick={() => setOpenAdd(true)}
        show={"tes"}
      />
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default ContohUji;
