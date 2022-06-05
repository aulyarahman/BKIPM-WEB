import { IconButton } from "@chakra-ui/react";
import { ArrowIcons } from "components";
import React from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { HasilUjiLaporan } from "./types-hasil";

export const Columns = () => {
  const columns: Column<HasilUjiLaporan>[] = React.useMemo(
    () => [
      {
        Header: "Nomor LHU",
        accessor: (v) => v.noLhu,
      },
      {
        Header: "Contoh Uji",
        accessor: (v) => v.countHasilUji,
      },
      {
        Header: "Kode Uji",
        accessor: (v) => v.kodeContohUji,
      },
      {
        Header: "Customer",
        accessor: (v) => v.namePelanggan,
      },
      {
        Header: "Tanggal Terbit",
        accessor: (v) => `${new Date(v.createdAt).toISOString().split("T")[0]}`,
      },

      {
        Header: "Aksi",
        accessor: (v) => (
          // pdf/:id/generate
          <Link
            target="_blank"
            to={`/pdf/${v.idUjiLab}/generate?num=${v.noLhu}`}
          >
            <IconButton aria-label="Search database" icon={<ArrowIcons />} />
          </Link>
        ),
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Laporan Hasil Uji",
      href: "/laporan-hasil-uji",
    },
  ];

  return {
    columns,
    bradCumbs,
  };
};
