import { IconButton } from "@chakra-ui/react";
import { ArrowIcons } from "components/icons";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { HasilUjiLaporan } from "pages/system_admin/LaporanHasilUji/types-hasil";
import React from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { SidebarProps } from "types";

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
      label: "Permohonan Uji",
      href: "/",
    },
    {
      label: "Selesai",
      href: "/selesai",
    },
  ];

  return {
    columns,
    bradCumbs,
  };
};
