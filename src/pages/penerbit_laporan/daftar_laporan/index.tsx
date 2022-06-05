import React from "react";
import Wrap from "layout/root";
import Tables from "components/tables";
import { Columns } from "./column";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { Spinner } from "@chakra-ui/react";
import { FbFirestore } from "../../../firebase/config";
import useSWR from "swr";

const useFetch = () => {
  const status = "Data diterima oleh petugas penerbit laporan";

  async function fetch() {
    try {
      const datas: any[] = [];
      return new Promise<DaftarPengajuan[]>((resolve, reject) => {
        FbFirestore.collection("uji-lab")
          .where("status", "in", ["selesai", status])
          .get()
          .then((res) => {
            res.forEach((v) => {
              datas.push(v.data());
            });
            resolve(datas);
          });
      });
    } catch (e) {}
  }

  const { data, error } = useSWR(["uji-lab"], fetch, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  return {
    data,
    error,
  };
};

const DaftarLaporan = () => {
  const { bradCumbs, columns } = Columns();
  const { data } = useFetch();

  return (
    <Wrap activeNum={2} items={bradCumbs}>
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default DaftarLaporan;
