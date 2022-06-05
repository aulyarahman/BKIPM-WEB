/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ListSidebarProps, TokenTypes } from "types";

import {
  CheckBoxIcons,
  CheckIcons,
  CheckIconsGray,
  FillIcons,
  FiltsIcons,
  HistoryIcons,
  LabsIcons,
  PapersGrayIcons,
  PapersIcons,
  UsersIcons,
} from "components/icons";
import { CopyIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { FbApp } from "../firebase/config";

const NAVIGATION_PELANGGAN: ListSidebarProps[] = [
  {
    id: 1,
    href: "/pelanggan-menunggu",
    title: "Menunggu",
    icon: <HistoryIcons />,
  },
  {
    id: 2,
    href: "/pelanggan-selesai",
    title: "Selesai",
    icon: <CheckIcons />,
  },
];

const NAVIGATION_PELANGGAN_REGISTRASI: ListSidebarProps[] = [
  {
    id: 1,
    href: "/pelanggan-registrasi",
    title: "Pelanggan",
    icon: <FillIcons />,
  },
  {
    id: 2,
    href: "/pelanggan-pengajuan",
    title: "Daftar Pengajuan",
    icon: <FillIcons />,
  },
];

const NAVIGATION_PELANGGAN_LAB: ListSidebarProps[] = [
  {
    id: 1,
    href: "/lab-permohonan",
    title: "Permohonan Uji Lab",
    icon: <CopyIcon />,
  },
  {
    id: 2,
    href: "/lab-uji",
    title: "Daftar Uji Lab",
    icon: <CopyIcon />,
  },
];

const NAVIGATION_PENERBIT_LAPORAN: ListSidebarProps[] = [
  {
    id: 1,
    href: "/penerbit-laporan",
    title: "Permohonan Laporan",
    icon: <CopyIcon />,
  },
  {
    id: 2,
    href: "/daftar-laporan",
    title: "Daftar Laporan",
    icon: <CopyIcon />,
  },
];

const NAVIGATION_SYSTEM_ADMIN: ListSidebarProps[] = [
  {
    id: 1,
    href: "/laporan-hasil-uji",
    title: "Laporan Hasil Uji",
    icon: <CheckIconsGray />,
  },
  {
    id: 2,
    href: "/uji-laboratorium",
    title: "Uji Laboratorium",
    icon: <LabsIcons />,
  },
  {
    id: 3,
    href: "/contoh-uji",
    title: "Contoh Uji",
    icon: <FiltsIcons />,
  },
  {
    id: 4,
    href: "/pelanggan",
    title: "Pelanggan",
    icon: <UsersIcons />,
  },
  {
    id: 5,
    href: "/petugas",
    title: "Petugas",
    icon: <UsersIcons />,
  },
  {
    id: 6,
    href: "/jenis-pengguna",
    title: "Jenis Pengguna",
    icon: <PapersGrayIcons />,
  },
];

//ROLES
// | "pelanggan"
// | "petugas_registrasi"
// | "petugas_lab"
// | "penerbit_laporan"
// | "system-admin";
export const SidebarNavigation = (): ListSidebarProps[] | undefined => {
  const vRoles = localStorage.getItem("roles");
  const [roles, setRoles] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        return FbApp.auth().onIdTokenChanged(async (user) => {
          if (!user) {
            return;
          }
          const claims = await user.getIdTokenResult();
          const resToken = claims.claims as TokenTypes;

          const regex = resToken.user_id.split("-")[0];

          if (resToken.roles === "sysadmin") {
            setRoles("SYSADMIN");
            return;
          }

          if (regex === "SYSADMIN") {
            setRoles("SYSADMIN");
            return;
          }

          if (regex === "PELANGGAN") {
            setRoles("PELANGGAN");
            return;
          }

          if (regex === "PETUGAS_REGISTRASI") {
            setRoles("PETUGAS_REGISTRASI");
            return;
          }
          if (regex === "PETUGAS_LAB") {
            setRoles("PETUGAS_LAB");
            return;
          }
          if (regex === "PENERBIT_LAPORAN") {
            setRoles("PENERBIT_LAPORAN");
            return;
          }
        });
      } catch (error: any) {
        console.error(error.response.data);
      }
    }

    fetch();
  }, []);

  if (roles === "PELANGGAN") return NAVIGATION_PELANGGAN;
  if (roles === "PETUGAS_REGISTRASI") {
    return NAVIGATION_PELANGGAN_REGISTRASI;
  }
  if (roles === "PETUGAS_LAB") {
    return NAVIGATION_PELANGGAN_LAB;
  }

  if (roles === "PENERBIT_LAPORAN") {
    return NAVIGATION_PENERBIT_LAPORAN;
  }

  if (roles === "SYSADMIN") {
    return NAVIGATION_SYSTEM_ADMIN;
  }
};
