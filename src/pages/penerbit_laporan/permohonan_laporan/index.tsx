import Wrap from "layout/root";
import Tables from "components/tables";
import { Columns } from "./column";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { useFirestore } from "hooks/useCreate";
import { Modals } from "components/Modal";
import { FbFirestore } from "../../../firebase/config";
import useSWR from "swr";

const status = "Data diterima oleh petugas lab";
const useFetch = () => {
  async function fetch() {
    try {
      const datas: any[] = [];
      return new Promise<DaftarPengajuan[]>((resolve, reject) => {
        FbFirestore.collection("uji-lab")
          .where("status", "==", status)
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

  const { data, error } = useSWR([status], fetch, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  return {
    data,
    error,
  };
};

const PermohonanLaporan = () => {
  const { bradCumbs, columns, OnEdit, id, setOnEdit } = Columns();
  const { onUpdate, mutate, loading } =
    useFirestore<DaftarPengajuan>("uji-lab");
  const { data } = useFetch();

  const OnAccept = async (data: DaftarPengajuan) => {
    const mocksData: DaftarPengajuan = {
      ...data,
      status: "Data diterima oleh petugas penerbit laporan",
    };
    try {
      await onUpdate(mocksData, `${mocksData.id}`);
      mutate(["pengajuan", "uji-lab", status]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrap activeNum={1} items={bradCumbs}>
      <Box h={"10px"}></Box>
      {OnEdit && (
        <Modals isOpen={OnEdit} setOpen={setOnEdit}>
          <Box p={3} experimental_spaceY={3}>
            <Text>Apakah kamu yakin menerima pengujian ini ?</Text>
            <Button
              isLoading={loading}
              onClick={() => OnAccept(id!)}
              colorScheme={"blue"}
            >
              Terima
            </Button>
          </Box>
        </Modals>
      )}
      {!data ? <Spinner /> : <Tables columns={columns} data={data} />}
    </Wrap>
  );
};

export default PermohonanLaporan;
