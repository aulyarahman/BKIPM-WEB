import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { SearchButton, Tables, Modals } from "components";
import { useFirestore } from "hooks/useCreate";
import Wrap from "layout/root";
import { useState } from "react";
import AddPleanggan from "./add-pelanggan";
import { Columns } from "./column";
import EditPelanggan from "./edit-pelanggan";
import { Pelangganypes } from "./pelanggan.types";

const PelangganRegistrasi = () => {
  const { id, columns, bradCumbs, OnEdit, setOnEdit, OnDelete, setOnDelete } =
    Columns();
  const { data, onDelete, loading } = useFirestore<Pelangganypes>("pelanggan");
  const [openAdd, setOpenAdd] = useState(false);

  if (!data) {
    return (
      <Wrap activeNum={1} items={bradCumbs}>
        <Spinner />
      </Wrap>
    );
  }

  const OnDeletePelanggan = async () => {
    try {
      const res = await onDelete(String(id?.id));
      setOnDelete(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrap activeNum={1} items={bradCumbs}>
      {/*  */}
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
      {/*  */}
      {OnEdit && (
        <Modals isOpen={OnEdit} setOpen={setOnEdit}>
          <EditPelanggan data={id!} />
        </Modals>
      )}
      {/* Modal Section */}
      <Modals isOpen={openAdd} setOpen={setOpenAdd}>
        <AddPleanggan />
      </Modals>

      <SearchButton
        labelBtn="Tambah Pelanggan"
        onClick={() => setOpenAdd(true)}
      />
      <Tables columns={columns} data={data} />
    </Wrap>
  );
};

export default PelangganRegistrasi;
