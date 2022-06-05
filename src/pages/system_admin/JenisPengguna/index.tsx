import React, { useEffect, useRef, useState } from "react";
import Wrap from "layout/root";
import { Columns } from "./column";
import { Modals, SearchButton, Tables } from "components";
import { JumlahPenggunaTypes } from "./jenispengguna.types";
import { useFirestore } from "hooks/useCreate";
import { PetugasTypes } from "../Petugas/petugas.types";
import { Pelangganypes } from "pages/petugas-regist/pelanggan/pelanggan.types";
import { Spinner } from "@chakra-ui/react";

function countValues(array: any, countItem: any) {
  let count = 0;
  array.forEach((itm: any) => {
    if (itm == countItem) count++;
  });
  console.log(`${countItem} ${count}`);
  return count;
}

const JenisPengguna = () => {
  const { bradCumbs, columns } = Columns();
  const [isMounted, setMounted] = useState(false);
  const [data, setData] = useState<JumlahPenggunaTypes[]>([]);
  const { data: dataPetugas } = useFirestore<PetugasTypes>("petugas");
  const { data: dataPelanggan } = useFirestore<Pelangganypes>("pelanggan");
  const [counts, setCounts] = useState(0);
  const [openAdd, setOpenAdd] = React.useState(false);

  useEffect(() => {
    const datax: JumlahPenggunaTypes[] = [];
    const leng: string[] = [];
    async function fetch() {
      dataPetugas?.map((v) => {
        const regex = v.id.split("-")[0];
        leng.push(regex);

        if (regex === "PETUGAS_REGISTRASI") {
          datax.push({
            roles: "PETUGAS_REGISTRASI",
            count: countValues(leng, "PETUGAS_REGISTRASI"),
          });
        }

        if (regex === "PETUGAS_LAB") {
          datax.push({
            roles: "PETUGAS_LAB",
            count: countValues(leng, "PETUGAS_LAB"),
          });
        }

        if (regex === "PENERBIT_LAPORAN") {
          datax.push({
            roles: "PENERBIT_LAPORAN",
            count: countValues(leng, "PENERBIT_LAPORAN"),
          });
        }

        if (regex === "SYSADMIN") {
          datax.push({
            roles: "SYSADMIN",
            count: countValues(leng, "SYSADMIN"),
          });
        }
      });

      setData(datax);
    }

    fetch();

    setTimeout(() => {
      setMounted(true);
      const ids = datax.map((o) => o.roles);
      const filtered = datax.filter(
        ({ roles }, index) => !ids.includes(roles, index + 1)
      );
      setCounts(10);
      setData(filtered);
    }, 300);
  }, [counts]);

  if (counts !== 10) {
    return <Spinner />;
  }

  return (
    <Wrap activeNum={6} items={bradCumbs}>
      <Tables columns={columns} data={data} />
    </Wrap>
  );
};

export default JenisPengguna;
