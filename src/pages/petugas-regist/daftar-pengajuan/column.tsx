import { EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { Colors } from "constant/color.enum";
import React, { useState } from "react";
import { Column } from "react-table";
import { DaftarPengajuan } from "./types";

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
        Header: "Status",
        accessor: (v) => (
          <Text
            color={
              v.status === "Uji Lab"
                ? Colors.BLUE
                : v.status === "Laporan Uji"
                ? Colors.GREEN
                : Colors.BLACK
            }
          >
            {v.status}
          </Text>
        ),
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
                setOnEdit(true);
                setId(v);
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
      label: "Pengajuan",
      href: "/pelanggan-pengajuan",
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
