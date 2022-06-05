import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { JumlahPenggunaTypes } from "./jenispengguna.types";

export const Columns = () => {
  const columns: Column<JumlahPenggunaTypes>[] = React.useMemo(
    () => [
      {
        Header: "Roles",
        accessor: (v) => v.roles,
      },
      {
        Header: "Jumlah Pengguna",
        accessor: (v) => v.count,
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
      label: "Jenis Pengguna",
      href: "/jenis-pengguna",
    },
  ];

  return {
    columns,
    bradCumbs,
  };
};
