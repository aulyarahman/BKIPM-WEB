import { Button, HStack, Text } from "@chakra-ui/react";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import React, { useState } from "react";
import { Column } from "react-table";

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
        Header: "Tanggal",
        accessor: (v) => `${new Date(v.createdAt).toISOString().split("T")[0]}`,
      },

      {
        Header: "Aksi",
        accessor: (v) => (
          <HStack>
            <Button
              rounded={"full"}
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
      label: "Permohonan Uji Lab",
      href: "/lab-permohonan",
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
