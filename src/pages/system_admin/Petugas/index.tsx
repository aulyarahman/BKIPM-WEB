import React from "react";
import Wrap from "layout/root";
import { Columns } from "./column";
import { Modals, SearchButton, Tables } from "components";
import datax from "./dummy.json";
import AddPetugas from "./AddPetugas";
import { useFirestore } from "hooks/useCreate";
import { PetugasTypes } from "./petugas.types";
import { Button, Spinner } from "@chakra-ui/react";
import { useFunctions } from "hooks/useFunctions";
import EditPetugas from "./EditPetugas";

const Petugas = () => {
  const { bradCumbs, columns, OnDelete, OnEdit, id, setOnDelete, setOnEdit } =
    Columns();
  const { useCallFunc } = useFunctions();

  const { data, error, loading, onDelete, mutate } =
    useFirestore<PetugasTypes>("petugas");
  const [openAdd, setOpenAdd] = React.useState(false);

  const OnDeletePetugas = async () => {
    try {
      await useCallFunc(
        {
          id: id?.id,
          email: id?.email,
          roles: id?.jenisPengguna,
        },
        "deleteAccount"
      );
      const res = await onDelete(`${id?.id}`);
      setOnDelete(res);
      mutate(["petugas"]);
    } catch (e) {}
  };

  return (
    <Wrap activeNum={5} items={bradCumbs}>
      <Modals isOpen={openAdd} setOpen={setOpenAdd}>
        <AddPetugas setOpenAdd={setOpenAdd} />
      </Modals>

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
              onClick={OnDeletePetugas}
            >
              Delete
            </Button>
          </div>
        </Modals>
      )}

      {OnEdit && (
        <Modals isOpen={OnEdit} setOpen={setOnEdit}>
          <EditPetugas data={id!} />
        </Modals>
      )}

      <SearchButton
        labelBtn="Tambah"
        onClick={() => setOpenAdd(true)}
        show={"tes"}
      />

      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default Petugas;
