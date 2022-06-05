import { Text } from "@chakra-ui/react";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import React from "react";
import { Column } from "react-table";

export const Columns = () => {
  const columns: Column<DaftarPengajuan>[] = React.useMemo(
    () => [
      {
        Header: "Jenis Contoh Uji",
        accessor: (v) => v.jenisContohUji,
      },
      {
        Header: "Nomor Sampel Uji",
        accessor: (v) => v.numSampleUji,
      },
      {
        Header: "Kode Contoh Uji",
        accessor: (v) => v.kodeContohUji,
      },
      {
        Header: "Tanggal Pengujian",
        accessor: (v) => `${new Date(v.createdAt).toISOString().split("T")[0]}`,
      },
      {
        Header: "Status",
        accessor: (v) => <Text>{v.status}</Text>,
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Permohonan Uji",
      href: "/",
    },
    {
      label: "Menunggu",
      href: "/permohonan",
    },
  ];

  return {
    columns,
    bradCumbs,
  };
};
