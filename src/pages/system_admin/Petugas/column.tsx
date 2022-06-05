import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { Column } from "react-table";
import { PetugasTypes } from "./petugas.types";

export const Columns = () => {
  const [id, setId] = useState<PetugasTypes | undefined>();
  const [OnEdit, setOnEdit] = useState(false);
  const [OnDelete, setOnDelete] = useState(false);

  const columns: Column<PetugasTypes>[] = React.useMemo(
    () => [
      {
        Header: "Nama",
        accessor: (v) => v.nama,
      },
      {
        Header: "Jenis Pengguna",
        accessor: (v) => v.jenisPengguna,
      },

      {
        Header: "Jabatan",
        accessor: (v) => v.jabatan,
      },

      {
        Header: "Pangkat",
        accessor: (v) => v.pangkat,
      },
      {
        Header: "Email",
        accessor: (v) => v.email,
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
      label: "Pengguna",
      href: "/pelanggan",
    },
    {
      label: "Petugas",
      href: "/petugas",
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
