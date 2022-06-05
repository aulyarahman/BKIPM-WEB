export interface DaftarPengajuan {
  id: string;
  pelanggan: string;
  namePelanggan: string;
  numSampleUji: string;
  petugas: string;
  jenisContohUji: string;
  kodeContohUji: string;
  status: string;
  bentuk: string;
  createdAt: number;
  countHasilUji: number;
}

export interface ReqCreateDaftarPengajuan {
  id?: string;
  pelanggan: string;
  numSampleUji: string;
  jenisContohUji: string;
  kodeContohUji: string;
  bentuk: string;
  status: string;
  createdAt: number;
}

export interface BentukTypes {
  id: string;
  bentuk: string;
  namaLatin: string;
  namaUmum: string;
  createdAt: number;
}

export interface SelectTypes {
  value: string;
  label: string;
}
