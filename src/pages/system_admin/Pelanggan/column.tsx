import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";
import { Pelangganypes } from "pages/petugas-regist/pelanggan/pelanggan.types";
import React, { useState } from "react";
import { Column } from "react-table";

export const Columns = () => {
  const [id, setId] = useState<Pelangganypes | undefined>();
  const [OnEdit, setOnEdit] = useState(false);
  const [OnDelete, setOnDelete] = useState(false);

  const columns: Column<Pelangganypes>[] = React.useMemo(
    () => [
      {
        Header: "Nama Costumer",
        accessor: (v) => v.namaUsaha,
      },
      {
        Header: "Pemilik",
        accessor: (v) => v.namaLengkap,
      },
      {
        Header: "Email",
        accessor: (v) => v.email,
      },
      {
        Header: "No.Hp",
        accessor: (v) => v.phoneNumber,
      },
      {
        Header: "Alamat",
        accessor: (v) => v.alamat,
      },
      {
        Header: "Tanggal Daftar",
        accessor: (v) => `${new Date(v.createdAt).toISOString().split("T")[0]}`,
      },
      {
        Header: "Aksi",
        accessor: (v) => (
          <HStack>
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<EditIcon />}
              onClick={() => {
                setOnEdit(true);
                setId(v);
              }}
            />

            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<DeleteIcon />}
              onClick={() => {
                setOnDelete(true);
                setId(v);
              }}
            />
          </HStack>
        ),
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Pelanggan",
      href: "/pelanggan",
    },
  ];

  return {
    columns,
    bradCumbs,
    id,
    OnEdit,
    setOnEdit,
    OnDelete,
    setOnDelete,
  };
};
