import { Button, HStack, Text } from "@chakra-ui/react";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";

export const Columns = () => {
  const [id, setId] = useState<DaftarPengajuan | undefined>();
  const navigate = useNavigate();
  const [OnEdit, setOnEdit] = useState(false);

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
          <Button
            colorScheme="blue"
            fontSize={"sm"}
            rounded="2xl"
            onClick={() => {
              setId(v);
              navigate(`/lab-uji/${v.id}`);
            }}
          >
            Isi Laporan
          </Button>
        ),
      },
    ],
    []
  );

  const bradCumbs = [
    {
      label: "Daftar Uji Lab",
      href: "/lab-daftar-uji",
    },
  ];

  return {
    columns,
    bradCumbs,
    OnEdit,
    setOnEdit,
    id,
  };
};
