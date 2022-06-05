import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";
import { HasilUjiLabTypes } from "pages/petugas_lab/daftar_uji_lab/types";
import React, { useState } from "react";
import { Column } from "react-table";

export const ColumnsDetailLaporan = () => {
  const [id, setId] = useState<HasilUjiLabTypes | undefined>();
  const [OnDelete, setOnDelete] = useState(false);
  const [OnUpdate, setOnUpdate] = useState(false);

  const columns: Column<HasilUjiLabTypes>[] = React.useMemo(
    () => [
      {
        Header: "Parameter",
        accessor: (v) => v.parameter,
      },
      {
        Header: "Nomor Pengajuan",
        accessor: (v) => v.nomorPengajuan,
      },

      {
        Header: "Hasil Uji",
        accessor: (v) => v.hasilUji,
      },
      {
        Header: "Persyaratan",
        accessor: (v) => v.persyaratan,
      },
      {
        Header: "Metode Pengujian",
        accessor: (v) => v.metodePengujian,
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Laporan Hasil Uji",
      href: "/daftar-laporan",
    },
  ];

  return {
    columns,
    bradCumbs,
    setOnUpdate,
    OnUpdate,
    setOnDelete,
    OnDelete,
    id,
  };
};
