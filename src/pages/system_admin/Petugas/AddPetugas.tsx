import {
  Stack,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { InputLabel, ButtonSave } from "components";
import { useFirestore } from "hooks/useCreate";
import { useFunctions } from "hooks/useFunctions";
import { GenerateId } from "model/GenerateId";
import toast from "react-hot-toast";
import { FC, useState } from "react";
import { PetugasCreateTypes } from "./petugas.types";

const options = [
  {
    label: "System Admin",
    value: "sysadmin",
  },
  {
    label: "Penerbit Laporan",
    value: "penerbit_laporan",
  },
  {
    label: "Petugas Lab",
    value: "petugas_lab",
  },
  {
    label: "Petugas Registrasi",
    value: "petugas_registrasi",
  },
];

function ValidateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

const AddPetugas: FC<{
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpenAdd }) => {
  const toasts = useToast();
  const { onCreate, loading, mutate } = useFirestore("petugas");
  const { onCreate: OnCreateCount } = useFirestore("user_count");
  const { useCallFunc } = useFunctions();
  const [data, setData] = useState<PetugasCreateTypes>({
    id: GenerateId("PTGAS"),
    email: "",
    jenisPengguna: "",
    nama: "",
    phoneNumber: "",
    password: "",
    jabatan: "",
    pangkat: "",
    passwordConfirm: "",
    createdAt: Date.now(),
  });

  const OnChangeData = (key: string, val: string) => {
    setData((v) => ({ ...v, [key]: val }));
  };

  const OnCreatePelanggan = async () => {
    if (!data.jenisPengguna) {
      toasts({
        description: "Jenis Pengguna Tidak boleh kosong",
        status: "error",
      });
      return;
    }
    if (data.password !== data.passwordConfirm) {
      toasts({
        description: "Password tidak cocok",
        status: "error",
      });
      return;
    }

    if (!ValidateEmail(data.email)) {
      toasts({
        description: "Email tidak valid",
        status: "error",
      });
      return;
    }

    if (
      !data.nama ||
      !data.jabatan ||
      !data.pangkat ||
      !data.phoneNumber ||
      !data.password
    ) {
      toasts({
        description: "Data Tidak boleh kosong",
        status: "error",
      });
      return;
    }

    const idx = GenerateId(`${data.jenisPengguna}`).toUpperCase();
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCallFunc(
        {
          id: idx,
          email: data?.email,
          roles: data?.jenisPengguna,
          password: data?.password,
        },
        "createAccount"
      );
      const mocking = {
        id: idx,
        email: data.email,
        jenisPengguna: data.jenisPengguna,
        nama: data.nama,
        phoneNumber: data.phoneNumber,
        jabatan: data.jabatan,
        pangkat: data.pangkat,
        createdAt: Date.now(),
      };
      await onCreate<any>(mocking, idx);
      mutate(["petugas"]);
      setOpenAdd(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Stack align={"start"} spacing={"40px"} py={"20px"}>
      <Heading size={"sm"}>Tambah Petugas</Heading>

      <SimpleGrid columns={1} spacing={3} w={"full"}>
        <VStack align={"start"}>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Jenis Pengguna
          </Text>
          <Select
            placeholder="Jenis Pengguna"
            onChange={(e: any) => OnChangeData("jenisPengguna", e.target.value)}
          >
            {options.map((it) => (
              <option value={it.value}>{it.label}</option>
            ))}
          </Select>
        </VStack>
        <InputLabel
          label="Email"
          onChange={(e) => OnChangeData("email", e.target.value)}
        />
        <InputLabel
          label="Nama Lengkap"
          onChange={(e) => OnChangeData("nama", e.target.value)}
        />
        <InputLabel
          label="Password"
          onChange={(e) => OnChangeData("password", e.target.value)}
        />
        <InputLabel
          label="Nomor Handphone"
          type={"number"}
          onChange={(e) => OnChangeData("phoneNumber", e.target.value)}
        />
        <InputLabel
          label="Konfirmasi Password"
          onChange={(e) => OnChangeData("passwordConfirm", e.target.value)}
        />
        <InputLabel
          label="Jabatan"
          onChange={(e) => OnChangeData("jabatan", e.target.value)}
        />

        <InputLabel
          label="Pangkat"
          onChange={(e) => OnChangeData("pangkat", e.target.value)}
        />
      </SimpleGrid>

      <ButtonSave onClick={OnCreatePelanggan} isLoading={loading}>
        Simpan
      </ButtonSave>
    </Stack>
  );
};

export default AddPetugas;
