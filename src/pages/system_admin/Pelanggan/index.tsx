import React from "react";
import Wrap from "layout/root";
import { Columns } from "./column";
import { Modals, SearchButton, Tables } from "components";
import AddPelanggan from "./AddPelanggan";
import { Pelangganypes } from "pages/petugas-regist/pelanggan/pelanggan.types";
import { useFirestore } from "hooks/useCreate";
import { Button, Spinner } from "@chakra-ui/react";
import EditPelanggan from "pages/petugas-regist/pelanggan/edit-pelanggan";
import { useFunctions } from "hooks/useFunctions";

const Pengguna = () => {
  const { id, columns, bradCumbs, OnEdit, setOnEdit, OnDelete, setOnDelete } =
    Columns();
  const { useCallFunc } = useFunctions();
  const [openAdd, setOpenAdd] = React.useState(false);
  const { data, onDelete, loading, mutate } =
    useFirestore<Pelangganypes>("pelanggan");

  const OnDeletePelanggan = async () => {
    try {
      await useCallFunc(
        {
          id: id?.id,
          email: id?.email,
          roles: id?.jenisPengguna,
        },
        "deleteAccount"
      );

      const res = await onDelete(String(id?.id));
      setOnDelete(res);
      mutate(["pelanggan"]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrap activeNum={4} items={bradCumbs}>
      {OnDelete && (
        <Modals isOpen={OnDelete} setOpen={setOnDelete}>
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
              onClick={OnDeletePelanggan}
            >
              Delete
            </Button>
          </div>
        </Modals>
      )}

      {OnEdit && (
        <Modals isOpen={OnEdit} setOpen={setOnEdit}>
          <EditPelanggan data={id!} />
        </Modals>
      )}
      <Modals isOpen={openAdd} setOpen={setOpenAdd}>
        <AddPelanggan />
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

export default Pengguna;
