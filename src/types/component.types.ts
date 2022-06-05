export interface BreadcrumbItemsProps {
  label: React.ReactNode;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemsProps[];
}

export interface NavbarProps extends BreadcrumbProps {}

export interface ListSidebarProps {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  activeNum: number;
}

export interface SidebarNavigationProps {
  roles:
    | "pelanggan"
    | "petugas_registrasi"
    | "petugas_lab"
    | "penerbit_laporan"
    | "system-admin";
}
