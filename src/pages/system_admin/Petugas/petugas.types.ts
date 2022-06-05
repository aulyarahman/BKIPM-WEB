export interface PetugasTypes {
  jenisPengguna: string;
  nama: string;
  email: string;
  phoneNumber: string;
  id: string;
  createdAt: number;
  jabatan: string;
  pangkat: string;
}

export interface PetugasCreateTypes {
  id?: string;
  password: string;
  passwordConfirm: string;
  jenisPengguna: string;
  nama: string;
  email: string;
  phoneNumber: string;
  jabatan: string;
  pangkat: string;
  createdAt: number;
}
