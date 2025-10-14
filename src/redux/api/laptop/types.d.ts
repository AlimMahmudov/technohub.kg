namespace CARDS {
  type GetLaptopRes = {
    id: number;
    name: string;
    discount: number;
    operating_system: string | null;
    storage_size_gb: string;
    in_stock: boolean;
    screen_size: number;
    ram_size_gb: number;
    cpu_model: string;
    brand: string;
    gpu_model: string;
    articles: number | null;
    in_composition: boolean;
    price: number;
    discount_price: number;
    laptop_image: {
      id: number;
      image: string;
    }[];
    slug?: string;
  };

  type GetLaptopReq = void;

  type GetLaptopDetailRes = {
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
    // storage_type: string;
    // cpu_frequency_mhz: number;
    // screen_type: string;
    // resolution: string;
    // refresh_rate: number;
    // gpu_memory: string;
    // ethernet: boolean;
    // bluetooth: boolean;
    // hdmi_count: boolean;
    // ethernet_port: boolean;
    // audio_jack: boolean;
    // battery_capacity_wh: number;
    // operation_system: string;

    keyboard_backlight: boolean;
    laptop_image?: {
      id: number;
      image: string | null;
    }[];
    slug?: string;
    keys: string;
  };

  type GetLaptopDetailReq = string;

  type PostBasketReq = {
    product_id: number;
    quantity: number;
  };
  type PostBasketRes = {
    id: number;
    laptop: number;
    quantity: number;
  };

  type GetBasketRes = {
    id: number;
    product: GetLaptopRes;
    quantity: number;
  };

  type UpdateQuantityRes = {
    id: number;
    quantity: number;
    product_id: number;
  };
}
