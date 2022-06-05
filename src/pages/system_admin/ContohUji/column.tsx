import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { Column } from "react-table";
import { ContohUjiTypes } from "./types-contohuji";

export const Columns = () => {
  const [id, setId] = useState<ContohUjiTypes | undefined>();
  const [OpenDelete, setOpenDelete] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const columns: Column<ContohUjiTypes>[] = React.useMemo(
    () => [
      {
        Header: "Nama Umum",
        accessor: (v) => v.namaUmum,
      },
      {
        Header: "Nama Latin",
        accessor: (v) => v.namaLatin,
      },
      {
        Header: "Bentuk",
        accessor: (v) => v.bentuk,
      },

      {
        Header: "Tanggal Dibuat",
        accessor: (v) =>
          `${new Date(Number(v.createdAt)).toISOString().split("T")[0]}`,
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
                setId(v);
                setOpenEdit(true);
              }}
            />

            <IconButton
              colorScheme="red"
              aria-label="Search database"
              icon={<DeleteIcon />}
              onClick={() => {
                setId(v);
                setOpenDelete(true);
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
      label: "Uji Laboratorium",
      href: "/uji-laboratorium",
    },
  ];

  return {
    columns,
    bradCumbs,
    setOpenEdit,
    setOpenDelete,
    OpenDelete,
    OpenEdit,
    id,
  };
};
