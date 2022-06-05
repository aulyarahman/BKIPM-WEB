import { EditIcon } from "@chakra-ui/icons";
import { IconButton, Text } from "@chakra-ui/react";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { HasilUjiLabTypes } from "pages/petugas_lab/daftar_uji_lab/types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";

export const Columns = () => {
  const [id, setId] = useState<DaftarPengajuan | undefined>();
  const [OnEdit, setOnEdit] = useState(false);

  const columns: Column<DaftarPengajuan>[] = React.useMemo(
    () => [
      {
        Header: "Customer",
        accessor: (v) => v.namePelanggan,
      },
      {
        Header: "Contoh Uji",
        accessor: (v) => v.jenisContohUji,
      },
      {
        Header: "Petugas",
        accessor: (v) => v.petugas,
      },
      {
        Header: "Data Uji",
        accessor: (v) => (
          <Link to={`/uji-laboratorium/pengujian/${v.id}`}>
            <Text color={"blue.200"} textDecoration={"underline"}>
              Lihat Data Uji
            </Text>
          </Link>
        ),
      },
      {
        Header: "Tanggal Pengujian",
        accessor: (v) => `${new Date(v.createdAt).toISOString().split("T")[0]}`,
      },
      {
        Header: "Aksi",
        accessor: (v) => (
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<EditIcon />}
            onClick={() => {
              setId(v);
              setOnEdit(true);
            }}
          />
        ),
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Uji Laboratorium",
      href: "/uji-laboratorium",
    },
  ];

  return {
    columns,
    bradCumbs,
    id,
    setOnEdit,
    OnEdit,
  };
};
