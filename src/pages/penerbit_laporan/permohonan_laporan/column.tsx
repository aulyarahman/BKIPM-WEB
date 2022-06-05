import { Button, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Column } from "react-table";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";

export const Columns = () => {
  const [id, setId] = useState<DaftarPengajuan | undefined>();
  const [OnEdit, setOnEdit] = useState(false);

  const columns: Column<DaftarPengajuan>[] = React.useMemo(
    () => [
      {
        Header: "Nama Costumer",
        accessor: (v) => v.pelanggan,
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
          <HStack>
            <Button
              rounded={"full"}
              disabled={
                v.status === "Data diterima oleh petugas penerbit laporan"
                  ? true
                  : false
              }
              colorScheme={"orange"}
              onClick={() => {
                setOnEdit(true);
                setId(v);
              }}
            >
              Terima
            </Button>
          </HStack>
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
      label: "Permohonan Laporan",
      href: "/permohonan-laporan",
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
