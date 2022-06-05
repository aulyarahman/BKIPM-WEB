import { Modals, SearchButton, Tables } from "components";
import { Spinner } from "@chakra-ui/spinner";
import { useFirestore } from "hooks/useCreate";
import Wrap from "layout/root";
import { Columns } from "./column";
import { DaftarPengajuan } from "pages/petugas-regist/daftar-pengajuan/types";
import { GenerateId } from "model/GenerateId";
import { Box, Button, Text } from "@chakra-ui/react";

const PelangganRegistrasi: React.FC = () => {
  const { columns, bradCumbs, OnEdit, id, setOnEdit } = Columns();
  const { data, error, onDelete } = useFirestore<DaftarPengajuan>("pengajuan");
  const { onCreate, mutate, loading } =
    useFirestore<DaftarPengajuan>("uji-lab");

  const OnAccept = async (data: DaftarPengajuan) => {
    const status = "Data diterima oleh petugas lab";
    const mocksData: DaftarPengajuan = {
      ...data,
      id: GenerateId("UJILAB"),
      status: status,
      createdAt: Date.now(),
    };
    try {
      await onCreate(mocksData, `${mocksData.id}`);
      await onDelete(data.id);
      mutate(["pengajuan", "uji-lab"]);
    } catch (e) {
      console.error(e);
    }
  };

  if (error) {
    return (
      <Wrap activeNum={1} items={bradCumbs}>
        <p>{error}</p>
      </Wrap>
    );
  }

  if (!data) {
    return (
      <Wrap activeNum={1} items={bradCumbs}>
        <Spinner />
      </Wrap>
    );
  }

  return (
    <Wrap activeNum={1} items={bradCumbs}>
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
      <Tables columns={columns} data={data} />
    </Wrap>
  );
};

export default PelangganRegistrasi;
