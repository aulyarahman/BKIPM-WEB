import create from "zustand";

interface TodoState {
  roles:
    | "pelanggan"
    | "petugas_registrasi"
    | "petugas_lab"
    | "penerbit_laporan"
    | "system-admin";
  setRoles: (
    roles:
      | "pelanggan"
      | "petugas_registrasi"
      | "petugas_lab"
      | "penerbit_laporan"
      | "system-admin"
  ) => void;
}

interface UiState {
  modal?: boolean;
}

interface UiStateGroup extends UiState {
  setUi: (v: UiState) => void;
}

export const useStore = create<TodoState>((set) => ({
  roles: "pelanggan",
  setRoles: (v) => {
    set(() => ({
      roles: v,
    }));
  },
}));

export const uiStore = create<UiStateGroup>((set) => ({
  modal: false,
  setUi: (v) => {
    set(() => ({ ...v }));
  },
}));
