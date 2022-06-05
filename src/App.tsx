import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/provider";

import Login from "./pages/login";

import IndexPage from "pages";
import GendPdf from "pages/GenPdf";

import Menunggu from "./pages/pelanggan/menunggu/menunggu";
import Selesai from "./pages/pelanggan/selesai/selesai";

import PelangganRegistrasi from "./pages/petugas-regist/pelanggan";
import PelangganPengajuan from "./pages/petugas-regist/daftar-pengajuan";

import PermohonanUjiLab from "pages/petugas_lab/permo_uji_lab";
import DaftarUjiLab from "pages/petugas_lab/daftar_uji_lab";
import AddUjiLab from "pages/petugas_lab/daftar_uji_lab/DetailUjiLab";

import PermohonanLaporan from "pages/penerbit_laporan/permohonan_laporan";
import DaftarLaporan from "pages/penerbit_laporan/daftar_laporan";
import DetailDaftarLaporan from "pages/penerbit_laporan/daftar_laporan/DetailDaftarLaporan";
import GeneratePdfDetailLaporan from "pages/penerbit_laporan/daftar_laporan/GeneratePdfDetailLaporan";

import LaporanHasilUji from "pages/system_admin/LaporanHasilUji";
import UjiLaboratorium from "pages/system_admin/UjiLaboratorium";
import ContohUji from "pages/system_admin/ContohUji";
import Pengguna from "pages/system_admin/Pelanggan";
import Petugas from "pages/system_admin/Petugas";
import JenisPengguna from "pages/system_admin/JenisPengguna";
import DetailUjiLab from "pages/system_admin/UjiLaboratorium/DetailUjiLab";

import theme from "theme";
import PrivateRoutes from "layout/PrivateRoot";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<Login />} path={"/login"} />
          <Route
            element={<PrivateRoutes components={<IndexPage />} />}
            path={"/"}
          />
          <Route
            element={<PrivateRoutes components={<GendPdf />} />}
            path={"/pdf/:id/generate"}
          />
          {/* Roles Pelanggan */}
          <Route
            element={<PrivateRoutes components={<Menunggu />} />}
            path={"/pelanggan-menunggu"}
          />
          <Route
            element={<PrivateRoutes components={<Selesai />} />}
            path={"/pelanggan-selesai"}
          />

          {/* Roles Petugas Registrasi */}
          <Route
            element={<PrivateRoutes components={<PelangganRegistrasi />} />}
            path={"/pelanggan-registrasi"}
          />
          <Route
            element={<PrivateRoutes components={<PelangganPengajuan />} />}
            path={"/pelanggan-pengajuan"}
          />

          {/* Roles Petugas Lab */}
          <Route
            element={<PrivateRoutes components={<PermohonanUjiLab />} />}
            path={"/lab-permohonan"}
          />
          <Route
            element={<PrivateRoutes components={<DaftarUjiLab />} />}
            path={"/lab-uji"}
          />
          <Route
            element={<PrivateRoutes components={<AddUjiLab />} />}
            path={"/lab-uji/:id"}
          />

          {/* Roles penerbit laporan */}
          <Route
            element={<PrivateRoutes components={<PermohonanLaporan />} />}
            path={"/penerbit-laporan"}
          />
          <Route
            element={<PrivateRoutes components={<DaftarLaporan />} />}
            path={"/daftar-laporan"}
          />
          <Route
            element={<PrivateRoutes components={<DetailDaftarLaporan />} />}
            path={"/daftar-laporan/:id"}
          />
          <Route
            element={
              <PrivateRoutes components={<GeneratePdfDetailLaporan />} />
            }
            path={"/daftar-laporan/:id/generate"}
          />

          {/* Roles System Admin*/}
          <Route
            element={<PrivateRoutes components={<LaporanHasilUji />} />}
            path={"/laporan-hasil-uji"}
          />
          <Route
            element={<PrivateRoutes components={<UjiLaboratorium />} />}
            path={"/uji-laboratorium"}
          />
          <Route
            element={<PrivateRoutes components={<ContohUji />} />}
            path={"/contoh-uji"}
          />
          <Route
            element={<PrivateRoutes components={<Pengguna />} />}
            path={"/pelanggan"}
          />
          <Route
            element={<PrivateRoutes components={<Petugas />} />}
            path={"/petugas"}
          />
          <Route
            element={<PrivateRoutes components={<JenisPengguna />} />}
            path={"/jenis-pengguna"}
          />
          <Route
            element={<PrivateRoutes components={<DetailUjiLab />} />}
            path={"/uji-laboratorium/pengujian/:id"}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
