export interface IDetail {
  id: number;
  name: string;
  description: string;
  link: string;
  price: number;
  in_composition: boolean;
  articles: number;
  in_stock: boolean;
  discount: number;
  warranty: number;
  brand: string;
  screen_size: number;
  operating_system: string;
  ram_size_gb: number;
  storage_size_gb: number;
  cpu_model: string;
  cpu_cores: number;
  cpu_threads: number;
  gpu_model: string;
  keyboard_backlight: boolean;
  laptop_image?: {
    id: number;
    image: string | null;
  }[];

  printer_image?: {
    id: number;
    image: string;
  }[];

  slug?: string;
  keys: string;
}


export interface ILaptopDetail {
  id: number;
  name: string;
  articles: number;
  laptop_image?: {
    id: number;
    image: string | null;
  }[];
  type: "laptop";
}

export interface IPrinterDetail {
  id: number;
  name: string;
  articles: number;
  printer_image?: {
    id: number;
    image: string;
  };
  type: "printer";
}

export type ProductDetail = ILaptopDetail | IPrinterDetail;
