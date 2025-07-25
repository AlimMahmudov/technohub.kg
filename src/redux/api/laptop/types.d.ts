namespace CARDS {
  type GetLaptopRes = {
    id: number;
    name: string;
    discount: number;
    operating_system: string;
    storage_size_gb: string;
    in_stock: boolean;
    screen_size: number;
    ram_size_gb: number;
    cpu_model: string;
    brand: string;
    gpu_model: string;
    width_mm: number;
    thickness_mm: number;
    weight_kg: number;
    price: number;
    laptop_image: {
      id: number;
      image: string;
    }[];
  };

  type GetLaptopReq = void;

  type GetLaptopDetailRes = {
    id: number;
    name: string;
    description: string;
    link: string;
    price: number;
    in_stock: boolean;
    discount: number;
    warranty: number;
    brand: string;
    screen_size: number;
    screen_type: string;
    resolution: string;
    refresh_rate: number;
    operating_system: string;
    ram_size_gb: number;
    storage_size_gb: number;
    storage_type: string;
    cpu_model: string;
    cpu_cores: number;
    cpu_threads: number;
    cpu_frequency_mhz: number;
    cpu_cache_mb: number;
    gpu_model: string;
    gpu_memory: string;
    wifi: string;
    ethernet: boolean;
    bluetooth: boolean;
    usb_type_a_count: number;
    hdmi_count: boolean;
    ethernet_port: boolean;
    audio_jack: boolean;
    keyboard_backlight: boolean;
    battery_type: string;
    battery_capacity_wh: number;
    operation_system: string;
    width_mm: number;
    thickness_mm: number;
    weight_kg: number;
    laptop_image?: {
      id: number;
      image: string | null;
    }[];
  };

  type GetLaptopDetailReq = number;

 
  /// basket

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
  }
}
