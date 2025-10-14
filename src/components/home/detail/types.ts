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
  slug?: string;
  keys: string;
}
