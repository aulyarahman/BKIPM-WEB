import { Button } from "@chakra-ui/react";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import React from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";

export const Columns = () => {
  const columns: Column<DaftarPengajuan>[] = React.useMemo(
    () => [
      {
        Header: "Nama Costumer",
        accessor: (v) => v.namePelanggan,
      },
      {
        Header: "Nomor Sampel Uji",
        accessor: (v) => v.numSampleUji,
      },
      {
        Header: "Jenis Contoh Uji",
        accessor: (v) => v.jenisContohUji,
      },
      {
        Header: "Kode Contoh Uji",
        accessor: (v) => v.kodeContohUji,
      },
      {
        Header: "Status",
        accessor: (v) => v.status,
      },
      {
        Header: "Tanggal",
        accessor: (v) => `${new Date(v.createdAt).toISOString().split("T")[0]}`,
      },

      {
        Header: "Aksi",
        accessor: (v) => (
          <Link to={`/daftar-laporan/${v.id}`}>
            <Button
              fontWeight={"semibold"}
              fontSize="sm"
              rounded={"2xl"}
              colorScheme="blue"
            >
              Isi Laporan
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Laporan Hasil Uji",
      href: "/permohonan-laporan",
    },
    {
      label: "Datar Laporan Terbit",
      href: "/daftar-laporan",
    },
  ];

  return {
    columns,
    bradCumbs,
  };
};
